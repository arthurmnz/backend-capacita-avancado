-- CreateTable
CREATE TABLE "public"."Produto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "Preço" TEXT NOT NULL,
    "Categoria" TEXT NOT NULL,
    "Descrição" TEXT NOT NULL,
    "Img" TEXT NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);
