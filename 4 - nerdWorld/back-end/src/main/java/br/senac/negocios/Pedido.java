package br.senac.negocios;

import java.util.List;

public class Pedido {
	
	private int id;
	private String dataPedido;
	private double valorFinal;
	private List<ItemVenda> itemVenda;
	private Usuario cliente;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDataPedido() {
		return dataPedido;
	}
	public void setDataPedido(String dataPedido) {
		this.dataPedido = dataPedido;
	}
	public double getValorFinal() {
		return valorFinal;
	}
	public void setValorFinal(double valorFinal) {
		this.valorFinal = valorFinal;
	}
	public List<ItemVenda> getItemVenda() {
		return itemVenda;
	}
	public void setItemVenda(List<ItemVenda> itemVenda) {
		this.itemVenda = itemVenda;
	}

	
}
