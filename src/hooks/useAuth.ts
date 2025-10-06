import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string, username: string) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", result.user.uid), {
        email,
        username,
        balance: 0,
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
      return result.user;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return result.user;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { register, login, loading, error };
}
