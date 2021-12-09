package br.senac.newWorld.daos;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import br.senac.exemplo_cadastro.DB;
import br.senac.negocios.Categoria;
import br.senac.negocios.ItemVenda;
import br.senac.negocios.Produto;
import br.senac.negocios.Usuario;
import br.senac.negocios.Venda;

public class DaoVenda {
	public static void vender(Venda venda) throws Exception {

		String sql = "INSERT INTO venda (codigo, data_venda, id_cliente) VALUES (?, ?, ?)";
		try (PreparedStatement ps = DB.connect().prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS)) {
			ps.setInt(1, venda.getCodigo());
			ps.setDate(2, Date.valueOf(venda.getDataVenda()));
			ps.setInt(3, venda.getUsuario().getId());

			ps.execute();

			ResultSet rsKeys = ps.getGeneratedKeys();
			if (rsKeys.next()) {
				int idGerado = rsKeys.getInt(1);

				inserirProdutosVendidos(idGerado, venda.getItensVendidos());
				atualizarEstoque(venda.getItensVendidos());

			}
		}
	}

	private static void inserirProdutosVendidos(int idVenda, List<ItemVenda> itensVenda) throws Exception {
		String sql = "INSERT INTO venda_produto (id_venda, id_produto, qtd, preco_vendido) " + "VALUES (?, ?, ?, ?)";
		for (ItemVenda itemVenda : itensVenda) {
			try (PreparedStatement ps = DB.connect().prepareStatement(sql)) {
				ps.setInt(1, idVenda);
				ps.setInt(2, itemVenda.getProduto().getId());
				ps.setInt(3, itemVenda.getQuantidade());
				ps.setFloat(4, itemVenda.getPrecoVendido());

				ps.execute();
			}
		}

	}

	private static void atualizarEstoque(List<ItemVenda> itensVendidos) throws Exception {
		String sql = "UPDATE produto SET estoque = estoque - ? WHERE id = ?";

		for (ItemVenda itemVenda : itensVendidos) {
			try (PreparedStatement ps = DB.connect().prepareStatement(sql)) {
				ps.setInt(1, itemVenda.getQuantidade());
				ps.setInt(2, itemVenda.getProduto().getId());

				ps.execute();
			}
		}
	}

	public static List<Venda> gerarRelatorio(LocalDate dataInicial, LocalDate dataFinal) throws Exception {
		String sql = "SELECT v.codigo, v.data_venda, u.nome as nome_cliente, p.id, p.nome as nome_produto, "
				+ "vp.preco_vendido, vp.qtd FROM venda v " + "INNER JOIN usuario u ON v.id_cliente = u.id "
				+ "INNER JOIN venda_produto vp ON v.id = vp.id_venda " + "INNER JOIN produto p ON vp.id_produto = p.id "
				+ "WHERE v.data_venda >= ? AND v.data_venda <= ?;";

		List<Venda> resultados = new ArrayList<Venda>();

		try (PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			ps.setDate(1, Date.valueOf(dataInicial));
			ps.setDate(2, Date.valueOf(dataFinal));

			ResultSet rs = ps.executeQuery();
			Venda venda = null;

			while (rs.next()) {
				int numeroVenda = rs.getInt("codigo");
				if (venda == null || venda.getCodigo() != numeroVenda) {
					venda = new Venda();

					venda.setCodigo(numeroVenda);
					venda.setDataVenda(rs.getDate("data_venda").toLocalDate());

					Usuario user = new Usuario();
					user.setNome(rs.getString("nome_cliente"));

					venda.setUsuario(user);
					resultados.add(venda);
				}

				Produto prod = new Produto();
				prod.setId(rs.getInt("id"));
				prod.setNome(rs.getString("nome_produto"));

				ItemVenda itemVenda = new ItemVenda();
				itemVenda.setPrecoVendido(rs.getFloat("preco_vendido"));
				itemVenda.setQuantidade(rs.getInt("qtd"));

				itemVenda.setProduto(prod);

				venda.getItensVendidos().add(itemVenda);

			}
		}
		return resultados;
	}

	public static int totalVendasCategoria(Categoria cat) throws Exception {
		String sql = "SELECT COUNT(v.codigo) as soma FROM venda v INNER JOIN usuario u ON v.id_cliente = u.id INNER JOIN venda_produto vp ON v.id = vp.id_venda INNER JOIN produto p ON vp.id_produto = p.id INNER JOIN categoria c ON p.categoria = c.id WHERE c.nome LIKE ?";

		try (PreparedStatement ps = DB.connect().prepareStatement(sql)) {
			ps.setString(1, "%"+cat.getNome()+"%");

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				return rs.getInt("soma");
			}

		}
		return 0;
	}
}
