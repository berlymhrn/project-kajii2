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
        if ($request->cookie('token')) {
            $response = Http::withHeaders(['Authorization' => 'Bearer ' . $request->cookie('token')])
                ->get('http://localhost:8088/api/user/check');

            if ($response->successful() && $response['info'] === 'Token valid') {
                return $next($request);
            } elseif ($response['info'] === 'Token tidak valid') {
                setcookie('token', '', time() - (3600 * 10), '/');
            }
        }

        // Jika tidak ada cookie 'token' atau token tidak valid, redirect ke halaman login
        return redirect()->route('login');
    }
}