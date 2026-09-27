# Galeria de Memórias

Site estático para GitHub Pages, feito somente com HTML, CSS e JavaScript.

## Como colocar suas fotos

Crie a pasta `media` e coloque suas imagens nela.

Depois, no `index.html`, altere:
`media/foto-01.jpg`

para o nome real do arquivo.

## Como colocar vídeos

Coloque os MP4 na pasta `media` e altere o `data-src` do card:
`data-src="media/video-01.mp4"`

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie `index.html`, `style.css`, `script.js` e a pasta `media`.
3. Vá em Settings > Pages.
4. Escolha a branch principal e a pasta `/ (root)`.
5. Salve e abra o endereço fornecido pelo GitHub.

Observação: vídeos grandes não são recomendados dentro do próprio repositório Git. Para uma galeria pública maior, use armazenamento externo para as mídias e mantenha o site no GitHub Pages.
