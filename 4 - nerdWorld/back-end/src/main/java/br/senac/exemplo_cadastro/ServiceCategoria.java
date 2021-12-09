package br.senac.exemplo_cadastro;

import java.util.List;
import br.senac.negocios.Categoria;
import br.senac.newWorld.daos.DaoCategoria;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

@Path("categoria")
public class ServiceCategoria {
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void inserir(Categoria cat) {
		try {
			DaoCategoria.inserir(cat);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Categoria> listar(){
		try {
			return DaoCategoria.listar();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void atualizar(Categoria newCat) {
		for (Categoria cat : listar()) {
			if (cat.getId() == newCat.getId()) {
				
				try {
					DaoCategoria.atualizar(newCat);
				} catch (Exception e) {
					e.printStackTrace();
				}
				
				break;
			}
		}
	}
	/*SQLIntegrityConstraintViolationException Precisa tratar essa exception, 
	 *Como a categoria é um atributo de produto, o banco não consegue excluir uma categoria que está ligada
	 *a algum produto, por conta da Foreign key
	 */
	
	@DELETE
	@Consumes(MediaType.APPLICATION_JSON)
	public void excluir(@QueryParam("id") int id) {
		try {
		for (Categoria cat : listar()) {
			if (cat.getId() == id) {
				DaoCategoria.excluir(id);
				break;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("pesquisar")
	public List<Categoria> pesquisar(@QueryParam("pesquisa") String pesquisa){
		try {
			return DaoCategoria.pesquisar(pesquisa);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("obter")
	public Categoria obter(@QueryParam("id") int id){
		try {
			return DaoCategoria.obter(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}

}
