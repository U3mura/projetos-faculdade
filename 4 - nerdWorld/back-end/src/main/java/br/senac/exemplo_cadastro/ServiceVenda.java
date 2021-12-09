package br.senac.exemplo_cadastro;

import java.time.LocalDate;
import java.util.List;

import br.senac.negocios.Categoria;
import br.senac.negocios.Venda;
import br.senac.newWorld.daos.DaoVenda;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

@Path("venda")
public class ServiceVenda {
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	 public void fazerVenda(Venda venda) {
		 try {
			DaoVenda.vender(venda);
		} catch (Exception e) {
			e.printStackTrace();
		}
	 }
	
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Venda> gerarRelatorio(@QueryParam("dataInicial") String dataInicial, @QueryParam("dataFinal")String dataFinal){
		try {
			return DaoVenda.gerarRelatorio(LocalDate.parse(dataInicial), LocalDate.parse(dataFinal));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("totalCategoria")
	public int totalVendaCategoria(Categoria cat) {
		try {
			return DaoVenda.totalVendasCategoria(cat);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return 0;
	}

}
