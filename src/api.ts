export type Product={id:number;sku:string;name:string;brand:string;category:string;price:number;stock:number;rating:number};
export type Cart={items:{product_id:number;name:string;quantity:number;unit_price:number;line_total:number}[];total:number};
const BASE=(import.meta.env.PROD ? '/api' : import.meta.env.VITE_API_BASE || '/api').replace(/\/$/,'');
const USER_ID='demo-user'; // Demo only; backend header is not authentication.
async function request<T>(path:string, init:RequestInit={}):Promise<T>{
 const response=await fetch(BASE+path,{...init,headers:{'X-User-Id':USER_ID,...(init.body instanceof FormData?{}:{'Content-Type':'application/json'}),...init.headers}});
 if(!response.ok){let message=`Request failed (${response.status})`;try{const e=await response.json();message=typeof e.detail==='string'?e.detail:message}catch{}throw new Error(message)}
 return response.json() as Promise<T>;
}
export const api={products:(q='',category='')=>request<Product[]>(`/products?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}`),cart:()=>request<Cart>('/cart'),add:(product_id:number,quantity=1)=>request<{message:string}>('/cart/items',{method:'POST',body:JSON.stringify({product_id,quantity})}),remove:(id:number)=>request<{message:string}>(`/cart/items/${id}`,{method:'DELETE'}),chat:(message:string,session_id?:string)=>request<{answer:string;session_id:string}>('/chat',{method:'POST',body:JSON.stringify({message,session_id})}),upload:(file:File)=>{const body=new FormData();body.append('file',file);return request<{filename:string;chunks_indexed:number}>('/documents',{method:'POST',body})}};
