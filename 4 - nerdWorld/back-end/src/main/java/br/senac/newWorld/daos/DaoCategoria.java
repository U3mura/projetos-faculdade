package br.senac.newWorld.daos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import br.senac.exemplo_cadastro.DB;
import br.senac.negocios.Categoria;

public class DaoCategoria {

	public static void inserir(Categoria cat) throws Exception{
		String sql = "INSERT INTO categoria (nome) VALUES (?)";
		
		try (PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			ps.setString(1, cat.getNome());
			
			ps.execute();
		}
		
	}
	
	public static void atualizar(Categoria cat) throws Exception{
		String sql = "UPDATE categoria SET nome = ? WHERE id = ?;";

		try (PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			ps.setString(1, cat.getNome());
			ps.setInt(2, cat.getId());
			
			ps.execute();
		}
		
	}
	
	public static void excluir(int id) throws Exception{
		String sql = "DELETE FROM categoria WHERE id = ?";
		
		try (PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			ps.setInt(1, id);
			
			ps.execute();
		}
		
		
	}
	
	public static List<Categoria> listar() throws Exception{
		String sql = "SELECT * FROM categoria";
		
		List<Categoria> resultados = new ArrayList<Categoria>();
		
		try(PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				Categoria cat = new Categoria();

				cat.setId(rs.getInt("id"));
				cat.setNome(rs.getString("nome"));
				
				resultados.add(cat);
			}
			
		}
		
		return resultados;
	}
	
	public static List<Categoria> pesquisar(String pesquisa) throws Exception{
		String sql = "SELECT * FROM categoria WHERE nome LIKE ?";
		
		List<Categoria> resultados = new ArrayList<Categoria>();
		
		try(PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			
			ps.setString(1, "%"+pesquisa+"%");
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				Categoria cat = new Categoria();

				cat.setId(rs.getInt("id"));
				cat.setNome(rs.getString("nome"));
								
				resultados.add(cat);
			}
			
		}
		
		return resultados;
	}
	
	public static Categoria obter(int id) throws Exception{
		String sql = "SELECT * FROM categoria WHERE id = ? LIMIT 1";
		
		try(PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()) {
				Categoria cat = new Categoria();

				cat.setId(rs.getInt("id"));
				cat.setNome(rs.getString("nome"));
				
				return cat;
			}
			
		}
		
		return null;
	}
	
}
