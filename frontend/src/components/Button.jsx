function Button({ isi, warna, type = "button" }) {
  const warnaTombol = {
    merah: "bg-red-500 hover:bg-red-600",
    biru: "bg-blue-500 hover:bg-blue-600",
    hijau: "bg-green-500 hover:bg-green-600",
    kuning: "bg-yellow-400 hover:bg-yellow-500 text-black",
  };

  return (
    <button
      type={type}
      className={`rounded-lg p-2 text-white ${warnaTombol[warna]}`}
    >
      {isi}
    </button>
  );
}

export default Button;
