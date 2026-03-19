import os

file_path = "src/pages/SettingsPage.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace Imports
old_imports = """import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield, Palette, Bell, Globe, Database,
    Eye, EyeOff, Moon, Sun, Monitor, Check,
    Clock, Zap, Target, MessageSquare, BarChart2, Flame,
    CheckCircle, AlertCircle, FileText, Trash2, AlertTriangle,
    ChevronLeft, ChevronRight, Settings, Lock, Download, Printer,
    Search, BookOpen, User, TrendingUp
} from 'lucide-react';
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    deleteUser,
    updateProfile
} from 'firebase/auth';
import { doc, updateDoc, deleteDoc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';"""

new_imports = """import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield, Palette, Bell, Globe, Database,
    Eye, EyeOff, Moon, Sun, Monitor, Check,
    Clock, Zap, Target, MessageSquare, BarChart2, Flame,
    CheckCircle, AlertCircle, FileText, Trash2, AlertTriangle,
    ChevronLeft, ChevronRight, Settings, Lock, Download, Printer,
    Search, BookOpen, User, TrendingUp, Camera
} from 'lucide-react';
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    deleteUser,
    updateProfile
} from 'firebase/auth';
import { doc, updateDoc, deleteDoc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase';"""

content = content.replace(old_imports, new_imports)

# State initialization replacement
old_state = """const ProfileTab = ({ showToast }) => {
    const { user, userData, logout } = useAuth();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Eksport & Delete states
    const [delPassword, setDelPassword] = useState('');
    const [showDelPass, setShowDelPass] = useState(false);
    const [delLoading, setDelLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const [form, setForm] = useState({
        displayName: userData?.displayName || '',
        phone: userData?.phone || '',
        school: userData?.school || '',
        region: userData?.region || '',
        grade: userData?.grade || '9',
        bio: userData?.bio || '',
    });"""

new_state = """const ProfileTab = ({ showToast }) => {
    const { user, userData, logout } = useAuth();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const fileInputRef = useRef(null);

    // Eksport & Delete states
    const [delPassword, setDelPassword] = useState('');
    const [showDelPass, setShowDelPass] = useState(false);
    const [delLoading, setDelLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const [form, setForm] = useState({
        displayName: userData?.displayName || '',
        phone: userData?.phone || '',
        school: userData?.school || '',
        region: userData?.region || '',
        grade: userData?.grade || '9',
        bio: userData?.bio || '',
        photoURL: userData?.photoURL || user?.photoURL || '',
    });"""

content = content.replace(old_state, new_state)

# photo upload logic inside ProfileTab
old_handle_save = """    const handleSave = async () => {"""

new_photo_upload = """    const handlePhotoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            if (showToast) showToast("Rasm hajmi 2MB dan katta bo'lmasligi kerak", 'error');
            return;
        }

        setUploadingPhoto(true);
        try {
            const photoRef = ref(storage, `users/${user.uid}/profile_${Date.now()}`);
            await uploadBytes(photoRef, file);
            const downloadURL = await getDownloadURL(photoRef);

            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { photoURL: downloadURL });
            }

            await setDoc(doc(db, "users", user.uid), { 
                photoURL: downloadURL,
                updatedAt: serverTimestamp() 
            }, { merge: true });

            try {
                 await setDoc(doc(db, "leaderboard", "global", "users", user.uid), {
                     uid: user.uid,
                     photoURL: downloadURL
                 }, { merge: true });
                 if (form.region) {
                     await setDoc(doc(db, "leaderboard", form.region, "users", user.uid), {
                         uid: user.uid,
                         photoURL: downloadURL
                     }, { merge: true });
                 }
            } catch(e) { console.error("Leaderboardga rasm saqlashda xato", e); }

            setForm(prev => ({ ...prev, photoURL: downloadURL }));
            if (showToast) showToast("Profil rasmi yangilandi! ✅", 'success');
        } catch (error) {
            console.error("Rasm yuklash xatosi:", error);
            if (showToast) showToast("Rasm yuklashda xatolik yuz berdi", 'error');
        } finally {
            setUploadingPhoto(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleSave = async () => {"""

content = content.replace(old_handle_save, new_photo_upload)

# Profile UI replacement
old_ui = """                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-600 border border-indigo-400/30 shadow-lg shadow-indigo-500/20
                            flex items-center justify-center text-2xl
                            font-bold text-white uppercase">
                        {form.displayName?.[0] || 'U'}
                    </div>
                    <div>
                        <p className="text-white font-medium text-lg">{form.displayName || "Ism kiritilmagan"}</p>
                        <p className="text-slate-400 text-sm">{user?.email}</p>
                    </div>
                </div>"""

new_ui = """                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <div className="w-20 h-20 rounded-full bg-indigo-600 border-2 border-indigo-400 overflow-hidden shadow-lg shadow-indigo-500/20
                                flex items-center justify-center text-3xl
                                font-bold text-white uppercase relative">
                            {form.photoURL ? (
                                <img src={form.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                form.displayName?.[0] || 'U'
                            )}
                            
                            {uploadingPhoto && (
                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>
                        
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingPhoto}
                            title="Rasmni o'zgartirish"
                            className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-800 transition-colors cursor-pointer z-10 disabled:opacity-50"
                        >
                            <Camera size={14} />
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handlePhotoUpload} 
                            accept="image/*" 
                            className="hidden" 
                        />
                    </div>
                    <div>
                        <p className="text-white font-medium text-lg">{form.displayName || "Ism kiritilmagan"}</p>
                        <p className="text-slate-400 text-sm">{user?.email}</p>
                    </div>
                </div>"""

content = content.replace(old_ui, new_ui)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("SettingsPage updated!")
