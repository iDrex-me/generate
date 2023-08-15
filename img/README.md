# Documentação: Gerador de Imagens com Texto Dinâmico

## Descrição

Este servidor Express fornece uma API para gerar imagens dinamicamente com texto personalizado. As características da imagem (como texto, tamanho, cores do texto e de fundo) são configuradas através dos parâmetros da URL.

## Como Usar

### URL Base:

```
https://generate.idrex.me/img/
```

### Parâmetros:

- `text`: O texto que você deseja exibir na imagem. (Padrão: "Texto padrão")
- `size`: Tamanho da imagem no formato `larguraxaltura` (por exemplo, `500x500`). (Padrão: "500x500")
- `color`: Cor do texto na imagem. Deve estar no formato hexadecimal. (Padrão: "#000")
- `background`: Cor de fundo da imagem. Deve estar no formato hexadecimal. (Padrão: "#FFF")

**Nota:** Alguns navegadores podem não codificar corretamente os caracteres "#". Por isso, em alguns casos, você pode precisar usar a codificação URL do caractere "#", que é `%23`.

### Exemplos:

1. Texto "Boa Tarde" em uma imagem de 400x300, cor de texto azul e fundo amarelo:
```
https://generate.idrex.me/img?text=Boa+Tarde&size=400x300&color=%230000FF&background=%23FFFF00
```

2. Texto "Olá Mundo!" com tamanho padrão, cor de texto preta e fundo branco:
```
https://generate.idrex.me/img?text=Olá+Mundo!
```

3. Texto "Exemplo 3" em uma imagem de 600x200, cor de texto verde e fundo cinza:
```
https://generate.idrex.me/img?text=Exemplo+3&size=600x200&color=%23008000&background=%23808080
```

4. Texto "Último Exemplo" em uma imagem de 450x150, cor de texto rosa e fundo azul claro:
```
https://generate.idrex.me/img?text=Último+Exemplo&size=450x150&color=%23FFC0CB&background=%23ADD8E6
```

## Código

O código usa o Node.js junto com os pacotes `express` e `canvas` para criar um servidor web que responde com imagens PNG geradas dinamicamente com base nos parâmetros fornecidos.

O servidor começa por inicializar o Express e definir algumas constantes de configuração. Uma função `wrapText` é usada para ajustar o texto, garantindo que ele se ajuste ao tamanho da imagem e quebre as linhas conforme necessário. A função `splitCurrentLine` auxilia neste processo.

Na rota `/img`, os parâmetros da URL são lidos e processados. O texto, o tamanho da imagem e as cores são definidos com base nesses parâmetros. A imagem é então gerada usando a biblioteca `canvas` e enviada como resposta.

O servidor é então iniciado e começa a ouvir na porta especificada.

---

Espero que essa documentação seja útil! Se você precisar de mais detalhes ou de informações adicionais, por favor, me avise.
