const {createHash} = await import("node:crypto");

 const p1 = "p1", p2 = "p2", p3 = "p1";

 const hash1 = createHash("sha256");
 const hash2 = createHash("sha256");
 const hash3 = createHash("sha256");

 hash1.update(p1)
 hash2.update(p2)
 hash3.update(p3)

 console.log(hash1.digest("hex") === hash3.digest("hex"))
