import { Suspense } from "react";
import { HeaderInnerPages } from "@/components/header-inner-pages";
import { InstagramPostsList } from "./instagram-posts-list";

export default function ImportProducts() {
  return (
    <>
      <HeaderInnerPages
        title="Gerenciar Importação de Posts do Instagram"
        description="Ao importar seus posts iremos agrupar e identificar informações como nome, descrição e preço dos produtos."
      />

      <div className="flex flex-col gap-4">
        <Suspense>
          <InstagramPostsList />
        </Suspense>
      </div>
    </>
  )
}
