/* elemeentos importados desde otro archivo */ 
import { useEffect, useState } from "react";
import Carta from "./Carta";


const MiApi = () => {
/* usamos useState para guardar datos   */
const [busqueda, setBusqueda] = useState ("");

    const [datos, setDatos] = useState([]);
/* usaremos useEfect para consultar la Api, dejamos el arrai  vacio para consultar  solo al inicio y evitar consumo extra de recursos */ 
    useEffect(() =>{
        obtenerData();
    },[]);

    const obtenerData = async () => {
        const url ="https://www.feriadosapp.com/api/laws.json";
        const respuesta = await fetch(url);
        const { data }= await respuesta.json();

        const feriados = data.map((feriado) => {
            return{
                id: feriado.id,
                contenido: feriado.content 
            };
        });
/* este metodo ordena lso elementos de manera inversa a como vienen originalmente en la api    el metodo sort, servioria para ordenar de forma 
aleatoria  pero es mas util con otro tipo de apis*/

        setDatos(feriados.reverse());
    };

    return (

/* Input para realizar buscquedas   */
        <>

        <div className=" bg-primary form-control me-2 my-3 " data-bs-theme="primary">
            <label htmlFor="busqueda">Búsqueda</label>
            <input 
            
                id="busqueda"
                type="text"
                placeholder="Buscar feriado"
                className="form-control"
                onChange={(e)=> {
                    setBusqueda (e.target.value)
                }} 
                value={busqueda}
            />
        </div>
            <div className="col">
                {
/* desde un aray  desencadenamos varios metodos, encadenamos para economizar en codigo  */

                    datos
                        // recorrera elemento por elemento e ira guardando los parametros en item //
                        .filter((item)=> { //tolowercase es para que todo pase a minuscula y no se complique la bsuquea //
                            if( item.contenido.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())
                            ){ //si nuestra busqeda encuetra coincidencias retorna los elementos en un nuevo aray. si no, retorna false y no muestra nada//
                                return true;
                            }
                                return false;
                        })
                    
                        .map((item) => {// si se encuentra y retorna true, se genera la carta que contiene lo que buscamos 
                            return < Carta key={item.id} contenido={item.contenido}/>;
                    })

                }

            </div>
        </>

    );
};

export default MiApi; 