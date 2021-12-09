package br.senac.exemplo_cadastro;

import java.util.List;

import br.senac.negocios.Produto;
import br.senac.newWorld.daos.DaoProduto;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

@Path("produto")
public class ServiceProduto {
	
	
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void inserir(Produto prod) {
		try {
			DaoProduto.inserir(prod);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Produto> listar(){
		try {
			return DaoProduto.listar();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void atualizar(Produto newProd) {

				try {
					DaoProduto.atualizar(newProd);
				} catch (Exception e) {
					e.printStackTrace();
				}
				
				
			}
		
	
	
	@DELETE
	@Consumes(MediaType.APPLICATION_JSON)
	public void excluir(@QueryParam("id") int id) {
		try {
			DaoProduto.excluir(id);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("pesquisar")
	public List<Produto> pesquisar(@QueryParam("pesquisa") String pesquisa){
		try {
			return DaoProduto.pesquisar(pesquisa);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("obter")
	public Produto obter(@QueryParam("id") int id){
		try {
			return DaoProduto.obter(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
}
