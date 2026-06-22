<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource (Manager only).
     */
    public function index(Request $request)
    {
        $users = User::orderBy('name')->get(['id', 'name', 'email', 'role', 'theme', 'created_at']);
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage (Manager only).
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|string|in:manager,cashier',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
            'theme' => 'blue', // Default theme
        ]);

        return response()->json([
            'message' => 'Akun berhasil didaftarkan.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'theme' => $user->theme,
                'created_at' => $user->created_at,
            ]
        ], 201); // 201 Created is better
    }

    /**
     * Update the specified resource in storage (Manager only).
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'role' => 'required|string|in:manager,cashier',
        ]);

        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ];

        if ($request->filled('password')) {
            $updateData['password'] = bcrypt($request->password);
        }

        $user->update($updateData);

        return response()->json([
            'message' => 'Akun berhasil diperbarui.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'theme' => $user->theme,
                'created_at' => $user->created_at,
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage (Manager only).
     */
    public function destroy(Request $request, $id)
    {
        // Prevent self-deletion
        if ($request->user()->id == $id) {
            return response()->json(['error' => 'Anda tidak dapat menghapus akun Anda sendiri.'], 400);
        }

        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'Akun berhasil dihapus.'
        ]);
    }
}
