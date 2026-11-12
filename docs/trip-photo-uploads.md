# Upload local de fotos de viagens

Este armazenamento é para desenvolvimento local. Os arquivos ficam em `uploads/trips/` no filesystem do backend, e a tabela `trip_photos` guarda apenas o caminho relativo. A pasta é ignorada pelo Git. O PostgreSQL em container não armazena as imagens.

## Enviar fotos

Faça uma requisição autenticada `POST /trips/:id/photos` como `multipart/form-data`. O campo deve se chamar `photos`; repita-o para enviar mais de uma foto. São aceitos JPEG, PNG e WebP, com limite de 5 MB por imagem e 10 imagens por requisição.

Exemplo com cURL:

```sh
curl -X POST "http://localhost:3333/trips/ID_DA_VIAGEM/photos" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -F "photos=@/caminho/foto1.jpg;type=image/jpeg" \
  -F "photos=@/caminho/foto2.png;type=image/png"
```

A resposta contém IDs e URLs relativas, por exemplo `/trips/ID_DA_VIAGEM/photos/ID_DA_FOTO`. Use `GET /trips/:id/photos` para listar as fotos ou `GET /trips/:id/photos/:photoId` para obter o arquivo. Todas essas rotas exigem autenticação.

No deploy, substitua esse armazenamento por um serviço de objetos como Cloudinary/S3 ou por um disco persistente configurado na hospedagem. O disco local padrão pode ser apagado em novos deploys ou reinicializações.