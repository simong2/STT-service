"use client";

import { useState } from "react";

export default function UpdateContext({ transcriptionId, initialContext }: { transcriptionId: string, initialContext: string }) {
    const [context, setContext] = useState(initialContext);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:8000/jobs/update-context/${transcriptionId}`, {
                method: "POST",
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to update context");
            }

            const data = await res.json();
            setContext(data.context_text);
        } catch (error) {
            console.error("Error updating context:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[40%] mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-primary mb-4">Summary 🤖</h1>
            <p className="text-gray-600">{context}</p>
            <button
                onClick={handleUpdate}
                className="mt-4 text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded hover:cursor-pointer"
                disabled={loading}
            >
                {loading ? "Updating..." : "Update Context"}
            </button>
        </div>
    );
}
