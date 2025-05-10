import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const SIP_SERVER_IP = "172.20.10.3";

const dbConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "kamailio",
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Dummy user for testing
const DUMMY_USER = {
  username: "081325228201",
  domain: SIP_SERVER_IP,
  ha1: "dummy_ha1",
  ha1b: "dummy_ha1b"
};

export async function POST(request) {
  let connection;
  try {
    const { phoneNumber } = await request.json();

    // Remove any non-digit characters
    const formattedNumber = phoneNumber.replace(/\D/g, "");

    // Check for dummy user first
    if (formattedNumber === DUMMY_USER.username) {
      return NextResponse.json({
        phoneNumber: DUMMY_USER.username,
        sipUsername: `sip:${DUMMY_USER.username}@${DUMMY_USER.domain}`,
        ha1: DUMMY_USER.ha1,
        ha1b: DUMMY_USER.ha1b
      });
    }

    // Get connection from pool
    connection = await pool.getConnection();
    
    // Check if user exists in subscriber table
    const [rows] = await connection.execute(
      'SELECT * FROM subscriber WHERE username = ? AND domain = ?',
      [formattedNumber, SIP_SERVER_IP]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Nomor tidak ditemukan" },
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