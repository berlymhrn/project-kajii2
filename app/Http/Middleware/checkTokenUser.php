<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CheckTokenUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Periksa apakah ada cookie 'token' dalam permintaan
        $token = $_COOKIE['token'];
        if ($token) {
            $response = Http::withHeaders(['Authorization' => 'Bearer ' . $token])
                ->get('http://localhost:8088/api/user/check');

            // Periksa apakah respons berhasil dan token valid
            if ($response->successful() && $response['info'] === 'Token valid') {
                return $next($request);
            } else {
                // Jika token tidak valid, hapus cookie dan alihkan ke halaman login
                setcookie('token', '', time() - (3600 * 10), '/');
                return redirect()->route('login');
            }
        }

        // Jika tidak ada cookie 'token', alihkan ke halaman login
        return redirect()->route('login');
    }
}