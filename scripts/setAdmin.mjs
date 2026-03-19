/**
 * Admin SDK script — bypasses Firestore security rules
 * Requires: npm install firebase-admin (run once)
 * Then: node scripts/setAdminRole.mjs
 *
 * Uses application default credentials from firebase CLI
 */

// Since we can't use firebase-admin without service account,
// we use the Firestore REST API with a google access token from firebase CLI

import { execSync } from 'child_process';
import https from 'https';

const PROJECT_ID = 'eduphysics-app';
const TARGET_EMAIL = 'ulugbekroziboyev05@gmail.com';

// Get access token from firebase CLI
function getAccessToken() {
    try {
        // gcloud token if available
        return execSync('gcloud auth print-access-token 2>/dev/null', { encoding: 'utf8' }).trim();
    } catch {
        // firebase CLI token
        const raw = execSync('firebase login:print-auth-token 2>&1', { encoding: 'utf8' }).trim();
        // Extract token
        const match = raw.match(/[A-Za-z0-9\-._~+/]+=*/);
        return match ? match[0] : raw;
    }
}

async function request(method, path, body = null, token) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'firestore.googleapis.com',
            path: path,
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
                catch { resolve({ status: res.statusCode, body: data }); }
            });
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function main() {
    console.log('Getting access token from firebase CLI...');

    // Use firebase login:print-auth-token
    let token;
    try {
        const out = execSync('firebase login:print-auth-token --project eduphysics-app 2>&1', { encoding: 'utf8' }).trim();
        // The token is on its own line
        const lines = out.split('\n').map(l => l.trim()).filter(l => l.length > 20 && !l.includes(' '));
        token = lines[lines.length - 1];
        if (!token) throw new Error('No token found');
        console.log('Token obtained (length:', token.length, ')');
    } catch (e) {
        console.error('Could not get token:', e.message);
        process.exit(1);
    }

    // Query Firestore for the user by email
    const basePath = `/v1/projects/${PROJECT_ID}/databases/(default)/documents`;
    const queryPath = `/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery`;

    const queryBody = {
        structuredQuery: {
            from: [{ collectionId: 'users' }],
            where: {
                fieldFilter: {
                    field: { fieldPath: 'email' },
                    op: 'EQUAL',
                    value: { stringValue: TARGET_EMAIL }
                }
            },
            limit: 5
        }
    };

    console.log(`\n🔍 Searching Firestore for: ${TARGET_EMAIL}`);
    const searchRes = await request('POST', queryPath, queryBody, token);

    if (searchRes.status !== 200) {
        console.error('Search failed:', searchRes.status, JSON.stringify(searchRes.body, null, 2));
        process.exit(1);
    }

    const docs = searchRes.body.filter(r => r.document);
    if (!docs.length) {
        console.error('❌ User not found! Email may not exist in Firestore.');
        process.exit(1);
    }

    for (const item of docs) {
        const docName = item.document.name; // full resource name
        const fields = item.document.fields;
        const displayName = fields.displayName?.stringValue || 'N/A';
        const currentRole = fields.role?.stringValue || 'N/A';
        console.log(`\n✅ Found: ${displayName}`);
        console.log(`   Current role: ${currentRole}`);
        console.log(`   Doc: ${docName}`);

        // PATCH to update role
        const patchPath = `/v1/${docName}?updateMask.fieldPaths=role&updateMask.fieldPaths=emailVerified`;
        const patchBody = {
            fields: {
                role: { stringValue: 'admin' },
                emailVerified: { booleanValue: true }
            }
        };
        const patchRes = await request('PATCH', patchPath, patchBody, token);
        if (patchRes.status === 200) {
            console.log(`🎉 SUCCESS — role updated to: admin`);
        } else {
            console.error('Patch failed:', patchRes.status, JSON.stringify(patchRes.body, null, 2));
        }
    }
    process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
