# Server Action を試す

試すぞっ

[Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)


`"use server"` をつけずに関数を `action` prop に渡すと以下の警告が出る:

```
Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server".
  <form action={function} children=...>
```

クライアントコンポーネントに渡せない、と言われているが、フォーム側をサーバーコンポーネントとして作っても同じメッセージになる。

正しく `"use server"` を設定して、`action` を

```ts
"use server"

export async function action(data: any){
    console.log(data)
}
```

とコンソールに吐かせるだけにして、"submit" 発火時のコンソールを見ると、

```
FormData {
  [Symbol(state)]: [
    {
      name: '$ACTION_ID_8107d21e2aeb34c71065fb4b06d93c5ca77bc13d',
      value: ''
    },
    { name: 'age', value: '42' },
    { name: 'name', value: 'Alice' }
  ]
}
```

と、確かにフォームの値が取れている。加えて `name: '$ACTION_ID_8107d21e2aeb34c71065fb4b06d93c5ca77bc13d'` という謎めいた値が付いている。このnameは実行ごとに変わらない。というか、HTMLを見ると `<input type="hidden" name="$ACTION_ID_8107d21e2aeb34c71065fb4b06d93c5ca77bc13d">` が追加されている。なんだこれは。

生成されるHTMLとしては、`<form>` の属性が

```html
<form action enctype="multipart/form-data" method="POST">
```

のように書き変わっている。

DevToolで見ると、ページと同じURL宛にPOSTメソッドでfetchリクエストが投げられているのが分かる。ヘッダーの中では、
リクエストの `Accept`, レスポンスの`Content-Type` ともに値が `text/x-component` となっている。

上の結果はサーバーコンポーネントだが、クライアントコンポーネントでも動作は特に変わらない。
ただ、hidden input の name は異なる値になっている。

サーバーコンポーネントとクライアントコンポーネントは、前者がactionをコンポーネント内で定義できるのに対して、後者はできないという点で異なる。`"use sever"` を付けた別ファイルで定義すれば、どちらからも使える。