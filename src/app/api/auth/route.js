import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const SIP_SERVER_IP = "10.0.0.10";

const dbConfig = {
  host: "10.0.0.10",
  port: 3306,
  user: "0822",
  password: "123",
  database: "kamailio",
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

export async function POST(request) {
  let connection;
  try {
    const { phoneNumber, password } = await request.json();

    // Remove any non-digit characters
    const formattedNumber = phoneNumber.replace(/\D/g, "");

    // Get connection from pool
    connection = await pool.getConnection();
    
    // Check if user exists in subscriber table and verify password
    const [rows] = await connection.execute(
      'SELECT * FROM subscriber WHERE username = ? AND domain = ? AND password = ?',
      [formattedNumber, SIP_SERVER_IP, password]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Nomor atau password salah" },
        { status: 401 }
      );
    }

    // Get the user data from the first row
    const user = rows[0];

    return NextResponse.json({
      phoneNumber: user.username,
      sipUsername: `sip:${user.username}@${user.domain}`,
      ha1: user.ha1,
      ha1b: user.ha1b
    });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Login gagal. Silakan coba lagi." },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
} 