package br.senac.newWorld.daos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import br.senac.exemplo_cadastro.DB;
import br.senac.negocios.Usuario;

public class DaoUsuario {
	
	public static void inserir(Usuario user) throws Exception{
		String sql = "INSERT INTO usuario (nome, celular, email) VALUES (?,?,?)";
		
		try (PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			ps.setString(1, user.getNome());
			ps.setString(2, user.getCelular());
			ps.setString(3, user.getEmail());
			
			ps.execute();
		}
		
	}
	
	public static void atualizar(Usuario user) throws Exception{
		String sql = "UPDATE usuario SET nome = ?, celular = ?, email = ? WHERE id = ?";

		
		try (PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			ps.setString(1, user.getNome());
			ps.setString(2, user.getCelular());
			ps.setString(3, user.getEmail());
			ps.setInt(4, user.getId());
			
			ps.execute();
		}
		
	}
	
	public static void excluir(int id) throws Exception{
		String sql = "DELETE FROM usuario WHERE id = ?";
		
		try (PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			ps.setInt(1, id);
			
			ps.execute();
		}
		
		
	}
	
	
	
	public static List<Usuario> listar() throws Exception{
		String sql = "SELECT * FROM usuario";
		
		List<Usuario> resultados = new ArrayList<Usuario>();
		
		try(PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				Usuario user = new Usuario();

				user.setId(rs.getInt("id"));
				user.setNome(rs.getString("nome"));
				user.setCelular(rs.getString("celular"));
				user.setEmail(rs.getString("email"));
				
				
				resultados.add(user);
			}
			
		}
		
		return resultados;
	}
	
	public static List<Usuario> pesquisar(String pesquisa) throws Exception{
		String sql = "SELECT * FROM usuario WHERE nome LIKE ? OR email LIKE ?";
		
		List<Usuario> resultados = new ArrayList<Usuario>();
		
		try(PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			
			ps.setString(1, "%"+pesquisa+"%");
			ps.setString(2, "%"+pesquisa+"%");
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				Usuario user = new Usuario();

				user.setId(rs.getInt("id"));
				user.setNome(rs.getString("nome"));
				user.setCelular(rs.getString("celular"));
				user.setEmail(rs.getString("email"));
				
				
				resultados.add(user);
			}
			
		}
		
		return resultados;
	}
	
	public static Usuario obter(int id) throws Exception{
		String sql = "SELECT * FROM usuario WHERE id = ? LIMIT 1";
		
		try(PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()) {
				Usuario user = new Usuario();

				user.setId(rs.getInt("id"));
				user.setNome(rs.getString("nome"));
				user.setCelular(rs.getString("celular"));
				user.setEmail(rs.getString("email"));
				
				
				return user;
			}
			
		}
		
		return null;
	}
	
}
