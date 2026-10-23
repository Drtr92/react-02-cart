import {useState} from "react";

function App() {

    const [name, setName] = useState("");
    const [cart, setCart] = useState([]);

    return (
        <>
            <h2>Simple shop</h2>
            <fieldset>
                <legend>상품 추가</legend>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    if (name === "" || name === " ") {
                        return;
                    }
                    setCart([...cart, {name: name, quantity: 1}]);
                    setName("");
                }}>
                    <input
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        placeholder={"상품명을 입력하세요"}
                        value={name}
                    />
                    <button type={"submit"}>카트에 담기</button>
                </form>
            </fieldset>
            <table border={1}
                   cellPadding={10}
                   style={{
                       width: "100%",
                       borderCollapse: "collapse"
                   }}>
                <thead style={{backgroundColor: "#f2f2f2"}}>
                <tr>
                    <th>상품명</th>
                    <th>수량 제어</th>
                    <th>관리</th>
                </tr>
                </thead>
                <tbody>
                {cart.map((item, index) => <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                        <button onClick={() => {
                            if (item.quantity <= 1) {return;}
                            const newCart = [...cart];
                            newCart[index].quantity -= 1;
                            setCart(newCart);


                        }}>-</button>
                        {item.quantity}
                        <button onClick={() => {
                              const newCart = [...cart];
                              newCart[index].quantity += 1;
                              setCart(newCart);


                        }}>+</button>
                    </td>
                    <td>
                        <button onClick={() => {
                            const result = cart.filter((_, i) => { return i !== index });
                            setCart(result);
                        }}>삭제</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <h3>총 품목 : {cart.length}개 / 총 수량 : {cart.reduce((sum, item) => { return item.quantity + sum }, 0)}개</h3>
        </>
    );
}

export default App;