import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export default function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      const transSnap = await getDocs(collection(db, "transactions"));
      setUsers(usersSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setTransactions(transSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 text-white bg-[#0a0a0a] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Kullanıcılar</h2>
        <div className="space-y-2">
          {users.map((u) => (
            <div key={u.id} className="p-3 bg-[#111] rounded-md">
              <p><b>Email:</b> {u.email}</p>
              <p><b>Kullanıcı Adı:</b> {u.username}</p>
              <p><b>Bakiye:</b> {u.balance}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">İşlemler</h2>
        <div className="space-y-2">
          {transactions.map((t) => (
            <div key={t.id} className="p-3 bg-[#111] rounded-md">
              <p><b>Kullanıcı ID:</b> {t.uid}</p>
              <p><b>Tutar:</b> {t.amount}</p>
              <p><b>Tür:</b> {t.type}</p>
              <p><b>Tarih:</b> {t.createdAt?.toDate?.().toLocaleString?.()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
