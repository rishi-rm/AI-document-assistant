exports.getEmbeddings = async (chunkTexts) => {
    const res = await fetch("http://localhost:8000/embed", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            texts: chunkTexts
        })
    })

    const data = await res.json();
    return data;
}