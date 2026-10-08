// src/components/PalindromeDiscount.jsx
import { useState } from 'react';

const PalindromeDiscount = () => {
    const [harga, setHarga] = useState('');
    const [nama, setNama] = useState('');
    const [hasil, setHasil] = useState(null);

    const handleCheck = (e) => {
        e.preventDefault();

        if (!harga || !nama.trim()) {
            alert('Harap masukkan harga dan nama pelanggan terlebih dahulu!');
            return;
        }

        const hargaPembelian = parseFloat(harga);

        // Mengabaikan spasi dan huruf besar/kecil
        const namaBersih = nama
            .replace(/\s+/g, '')
            .toLowerCase();

        // Mengecek minimal 3 karakter
        let isPalindrome = false;

        if (namaBersih.length >= 3) {
            const namaBalik = namaBersih
                .split('')
                .reverse()
                .join('');

            isPalindrome = namaBersih === namaBalik;
        }

        // Menghitung jumlah karakter unik
        const karakterUnik = new Set(namaBersih);
        const jumlahKarakterUnik = karakterUnik.size;

        // Menentukan diskon
        let diskon;

        if (isPalindrome) {
            // Palindrome mendapatkan diskon spesial 25%
            diskon = 25;
        } else {
            // Bukan palindrome: 1% per karakter unik
            diskon = jumlahKarakterUnik;
        }

        // Menghitung potongan harga
        const potonganHarga =
            hargaPembelian * (diskon / 100);

        // Menghitung harga setelah diskon
        const hargaSetelahDiskon =
            hargaPembelian - potonganHarga;

        setHasil({
            status: isPalindrome
                ? 'Palindrom'
                : 'Bukan Palindrom',
            jumlahKarakterUnik,
            diskon,
            hargaSetelahDiskon
        });
    };

    return (
        <div>
            <h2>Program Diskon Palindrom Nama</h2>

            <form onSubmit={handleCheck}>
                <div>
                    <label>Total Harga Pembelian: </label>
                    <input
                        type="number"
                        value={harga}
                        onChange={(e) =>
                            setHarga(e.target.value)
                        }
                        placeholder="Contoh: 100000"
                    />
                </div>

                <br />

                <div>
                    <label>Nama Pelanggan: </label>
                    <input
                        type="text"
                        value={nama}
                        onChange={(e) =>
                            setNama(e.target.value)
                        }
                        placeholder="Contoh: Anna"
                    />
                </div>

                <br />

                <button type="submit">
                    Cek & Hitung
                </button>
            </form>

            {hasil && (
                <div>
                    <h3>Hasil Pemeriksaan:</h3>

                    <p>
                        <strong>Status Nama:</strong>{' '}
                        {hasil.status}
                    </p>

                    <p>
                        <strong>Jumlah Karakter Unik:</strong>{' '}
                        {hasil.jumlahKarakterUnik}
                    </p>

                    <p>
                        <strong>Persentase Diskon:</strong>{' '}
                        {hasil.diskon}%
                    </p>

                    <p>
                        <strong>
                            Harga Pembelian Setelah Diskon:
                        </strong>{' '}
                        Rp{' '}
                        {hasil.hargaSetelahDiskon.toLocaleString(
                            'id-ID'
                        )}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PalindromeDiscount;