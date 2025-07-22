export async function detectObjects(file: Blob | File): Promise<string[]> {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_YOLO_API}/detect`,
        { method: "POST", body: form }
    );
    if (!res.ok) throw new Error(`検知失敗: ${res.statusText}`);
    return res.json();
}
