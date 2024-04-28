<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__ . '/auth.php';

Route::get('/', function () {
    return Inertia::render('Home/Index');
});
Route::get('/about', function () {
    return Inertia::render('About/Index');
});
Route::get('/artikel', function () {
    return Inertia::render('News/Index');
});
Route::get('/artikel/{id}', function ($id) {
    return Inertia::render('News/DetailNews', ['id' => $id]);
});
Route::get('/kegiatan', function () {
    return Inertia::render('Kegiatan/Index');
});
Route::get('/homestay', function () {
    return Inertia::render('Homestay/Index');
});
Route::get('/homestay/detail/{id}', function ($id) {
    return Inertia::render('Homestay/DetailHomestay', ['id' => $id]);
});
Route::get('/ikan-hias', function () {
    return Inertia::render('IkanHias/Index');
});
Route::get('/ikan-hias/detail/{id}', function ($id) {
    return Inertia::render('IkanHias/DetailIkanHias', ['id' => $id]);
});
Route::get('/ikan-hias-all', function () {
    return Inertia::render('IkanHias/IkanHias');
});
Route::get('/kolam-ikan-all', function () {
    return Inertia::render('IkanHias/KolamIkan');
});
Route::get('/kolam-ikan/detail/{id}', function ($id) {
    return Inertia::render('IkanHias/DetailKolam', ['id' => $id]);
});
Route::get('/paket-wisata', function () {
    return Inertia::render('Wisata/Index');
});
Route::get('/hiburan', function () {
    return Inertia::render('hiburan/Index');
});
Route::get('/booking/{entityType}/{id}', function ($entityType, $id) {
    return Inertia::render('Booking/BookingForm2', ['entityType' => $entityType, 'id' => $id]);
})->middleware('checkToken');
Route::get('/booking/detail', function () {
    return Inertia::render('Booking/BookingDetail');
});
Route::get('/booking/paymentMethod', function () {
    return Inertia::render('Booking/Payment');
});
Route::get('/booking/paymentMethod/steps', function () {
    return Inertia::render('Booking/PaymentSteps');
});
Route::get('/account/history', function () {
    return Inertia::render('ProfileUser/TransactionHistory');
});
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
});
Route::get('/akun', function () {
    return Inertia::render('ProfileUser/ProfileAccount');
});
