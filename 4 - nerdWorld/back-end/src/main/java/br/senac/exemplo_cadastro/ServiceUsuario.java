package br.senac.exemplo_cadastro;

import java.util.List;
import br.senac.negocios.Usuario;
import br.senac.newWorld.daos.DaoUsuario;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

@Path("usuario")
public class ServiceUsuario {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void inserir(Usuario user) {
		try {
			DaoUsuario.inserir(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Usuario> listar(){
		try {
			return DaoUsuario.listar();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void atualizar(Usuario newUser) {
		for (Usuario user : listar()) {
			if (user.getId() == newUser.getId()) {
				
				try {
					DaoUsuario.atualizar(newUser);
				} catch (Exception e) {
					e.printStackTrace();
				}
				
				break;
			}
		}
	}
	
	@DELETE
	@Consumes(MediaType.APPLICATION_JSON)
	public void excluir(@QueryParam("id") int id) {
		try {
		for (Usuario usuario : listar()) {
			if (usuario.getId() == id) {
				DaoUsuario.excluir(id);
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
	public List<Usuario> pesquisar(@QueryParam("pesquisa") String pesquisa){
		try {
			return DaoUsuario.pesquisar(pesquisa);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("obter")
	public Usuario obter(@QueryParam("id") int id){
		try {
			return DaoUsuario.obter(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	
}
