package br.senac.negocios;

public class ItemVenda {
	private Produto produto;
	private int quantidade;
	private Float precoVendido;


	public Produto getProduto() {
		return produto;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

	public int getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(int quantidade) {
		this.quantidade = quantidade;
	}

	public Float getPrecoVendido() {
		return precoVendido;
	}

	public void setPrecoVendido(Float precoVendido) {
		this.precoVendido = precoVendido;
	}

}
