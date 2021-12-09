package br.senac.exemplo_cadastro;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DB {

	public static Connection connect() throws SQLException, ClassNotFoundException {
		Class.forName("com.mysql.cj.jdbc.Driver");
		return DriverManager.getConnection(
				"jdbc:mysql://localhost:3306/nerdWorld",
				"root",
				"1234");
	}
	
	public static void main(String[] args) throws ClassNotFoundException, SQLException {
		connect();
	}
}
