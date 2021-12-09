package br.senac.negocios;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Venda {
	private int id;
	private int codigo;
	private LocalDate dataVenda;
	private Usuario usuario;
	private List<ItemVenda> itensVendidos = new ArrayList<ItemVenda>();
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCodigo() {
		return codigo;
	}
	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}
	public LocalDate getDataVenda() {
		return dataVenda;
	}
	public void setDataVenda(LocalDate dataVenda) {
		this.dataVenda = dataVenda;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public List<ItemVenda> getItensVendidos() {
		return itensVendidos;
	}
	public void setItensVendidos(List<ItemVenda> itensVendidos) {
		this.itensVendidos = itensVendidos;
	}
	
	
}
