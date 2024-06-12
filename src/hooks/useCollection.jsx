import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

//hook to fetch a collection from firestore

const useCollection = (collectionName) => {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = () => {
            const postRef = query(collection(db, collectionName));
            onSnapshot (postRef, (snapshot) => {
                setData(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
                setLoading(false);
            });
        };
        getData();
    }, [collectionName]);
  return {
    data,
    loading,
  };
};

export default useCollection;