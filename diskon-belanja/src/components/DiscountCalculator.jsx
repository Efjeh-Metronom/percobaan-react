// src/components/DiscountCalculator.jsx
import { useState } from 'react';

const DiscountCalculator = () => {
    const [harga, setHarga] = useState('');
    const [nama, setNama] = useState('');
    const [hasil, setHasil] = useState(null);

    const handleHitung = (e) => {
        e.preventDefault();

        if (!harga || !nama.trim()) {
            alert('Harap masukkan harga dan nama pelanggan terlebih dahulu!');
            return;
        }

        const hargaPembelian = parseFloat(harga);

        // Menghitung jumlah huruf konsonan
        const namaBersih = nama.toUpperCase();

        let jumlahKonsonan = 0;

        for (let karakter of namaBersih) {
            if (
                karakter >= 'A' &&
                karakter <= 'Z' &&
                !'AEIOU'.includes(karakter)
            ) {
                jumlahKonsonan++;
            }
        }

        // Menghitung jumlah kata
        const jumlahKata = nama.trim().split(/\s+/).length;

        // Diskon berdasarkan jumlah konsonan
        let diskon = jumlahKonsonan * 2;

        // Bonus diskon jika lebih dari 2 kata
        if (jumlahKata > 2) {
            diskon += 5;
        }

        // Maksimal diskon 20%
        if (diskon > 20) {
            diskon = 20;
        }

        // Menghitung potongan harga
        const potonganHarga = hargaPembelian * (diskon / 100);

        // Harga setelah diskon
        const hargaSetelahDiskon = hargaPembelian - potonganHarga;

        setHasil({
            jumlahKonsonan,
            jumlahKata,
            diskon,
            potonganHarga,
            hargaSetelahDiskon
        });
    };

    return (
        <div>
            <h2>Program Diskon Huruf Konsonan</h2>

            <form onSubmit={handleHitung}>
                <div>
                    <label>Total Harga Pembelian: </label>
                    <input
                        type="number"
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                        placeholder="Contoh: 100000"
                    />
                </div>

                <br />

                <div>
                    <label>Nama Pelanggan: </label>
                    <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                    />
                </div>

                <br />

                <button type="submit">
                    Hitung Diskon
                </button>
            </form>

            {hasil && (
                <div>
                    <h3>Hasil Perhitungan:</h3>

                    <p>
                        <strong>Jumlah Huruf Konsonan:</strong>{' '}
                        {hasil.jumlahKonsonan}
                    </p>

                    <p>
                        <strong>Jumlah Kata:</strong>{' '}
                        {hasil.jumlahKata}
                    </p>

                    <p>
                        <strong>Persentase Diskon:</strong>{' '}
                        {hasil.diskon}%
                    </p>

                    <p>
                        <strong>Total Potongan Harga:</strong>{' '}
                        Rp {hasil.potonganHarga.toLocaleString('id-ID')}
                    </p>

                    <p>
                        <strong>Harga Pembelian Setelah Diskon:</strong>{' '}
                        Rp {hasil.hargaSetelahDiskon.toLocaleString('id-ID')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default DiscountCalculator;