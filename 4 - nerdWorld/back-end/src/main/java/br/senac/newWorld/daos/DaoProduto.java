package br.senac.newWorld.daos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import br.senac.exemplo_cadastro.DB;
import br.senac.negocios.Categoria;
import br.senac.negocios.Produto;

public class DaoProduto {
	
	
	public static void inserir(Produto prod) throws Exception{
		String sql = "INSERT INTO produto (nome, preco, categoria,descricao, estoque) VALUES (?,?,?,?,?)";
		
		try (PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			ps.setString(1, prod.getNome());
			ps.setFloat(2, prod.getPreco());
			ps.setInt(3, prod.getCategoria().getId());
			ps.setString(4, prod.getDescricao());
			ps.setInt(5, prod.getEstoque());

			
			ps.execute();
		}
		
	}
	
	public static void atualizar(Produto prod) throws Exception{
		String sql = "UPDATE produto SET nome = ?, preco = ?, categoria = ?, descricao = ?, estoque = ? WHERE id = ?";

		
		try (PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			ps.setString(1, prod.getNome());
			ps.setFloat(2, prod.getPreco());
			ps.setInt(3, prod.getCategoria().getId());
			ps.setString(4, prod.getDescricao());
			ps.setInt(5, prod.getEstoque());
			ps.setInt(6, prod.getId());
			
			
			ps.execute();
		}
		
	}
	
	public static void excluir(int id) throws Exception{
		String sql = "DELETE FROM Produto WHERE id = ?";
		
		try (PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			ps.setInt(1, id);
			
			ps.execute();
		}
		
		
	}
	
	public static List<Produto> listar() throws Exception{
		String sql = 
		"SELECT produto.id, produto.nome, produto.preco, produto.descricao, produto.estoque, categoria.id id_categoria, categoria.nome nome_categoria "
		+ "FROM produto INNER JOIN categoria ON produto.categoria = categoria.id;";
		
		List<Produto> resultados = new ArrayList<Produto>();
		
		try(PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				Produto prod = new Produto();

				prod.setId(rs.getInt("id"));
				prod.setNome(rs.getString("nome"));
				prod.setPreco(rs.getFloat("preco"));
				prod.setDescricao(rs.getString("descricao"));
				prod.setEstoque(rs.getInt("estoque"));
				
				Categoria categoria = new Categoria();
				categoria.setId(rs.getInt("id_categoria"));
				categoria.setNome(rs.getString("nome_categoria"));
				prod.setCategoria(categoria);
				
				
				resultados.add(prod);
			}
			
		}
		
		return resultados;
	}
	
	
	public static List<Produto> pesquisar(String pesquisa) throws Exception{
		String sql = "SELECT produto.id, produto.nome, produto.preco, produto.descricao, produto.estoque, categoria.id id_categoria, categoria.nome nome_categoria "
				+ "FROM produto INNER JOIN categoria ON produto.categoria = categoria.id "
				+ "WHERE produto.nome LIKE ? OR descricao LIKE ?";
		
		List<Produto> resultados = new ArrayList<Produto>();
		
		try(PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			
			ps.setString(1, "%"+pesquisa+"%");
			ps.setString(2, "%"+pesquisa+"%");
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()) {
				Produto prod = new Produto();

				prod.setId(rs.getInt("id"));
				prod.setNome(rs.getString("nome"));
				prod.setPreco(rs.getFloat("preco"));
				prod.setDescricao(rs.getString("descricao"));
				prod.setEstoque(rs.getInt("estoque"));
				
				Categoria categoria = new Categoria();
				categoria.setId(rs.getInt("id_categoria"));
				categoria.setNome(rs.getString("nome_categoria"));
				prod.setCategoria(categoria);
				
				
				resultados.add(prod);
			}
			
		}
		
		return resultados;
	}
	
	public static Produto obter(int id) throws Exception{
		String sql = "SELECT produto.id, produto.nome, produto.preco, produto.descricao, produto.estoque, categoria.id id_categoria, categoria.nome nome_categoria "
				+ "FROM produto INNER JOIN categoria ON produto.categoria = categoria.id "
				+ "WHERE produto.id = ? LIMIT 1";
		
		try(PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()) {
				Produto prod = new Produto();

				prod.setId(rs.getInt("id"));
				prod.setNome(rs.getString("nome"));
				prod.setPreco(rs.getFloat("preco"));
				prod.setDescricao(rs.getString("descricao"));
				prod.setEstoque(rs.getInt("estoque"));
				
				Categoria categoria = new Categoria();
				categoria.setId(rs.getInt("id_categoria"));
				categoria.setNome(rs.getString("nome_categoria"));
				prod.setCategoria(categoria);
				
				
				return prod;
			}
			
		}
		
		return null;
	}
}
