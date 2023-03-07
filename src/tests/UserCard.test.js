import { render, waitFor, screen } from "@testing-library/react"
import UserCard from "../components/UserCard"
import axios from "axios"
import { productCardMock } from "./ProductCardMock"

jest.mock("axios") 

// const axiosResponseMock = {
//   data: {
//     firstName: "Oleta",
//     lastName: "Abbott",
//     bank: { 
//       cardNumber: "3589640949470047",
//       cardExpire: "10/23"
//     }
//   }
// }

const axiosResponseMock = {
  data: productCardMock
}

//Fixaçao
describe("UserCard", () => {
  test("renderizar o carregamento inicial e finalizar o loading", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock)
    
    render(<UserCard />)
    const loading = screen.getByText(/loading\.\.\./i)
    expect(loading).toBeInTheDocument()

    await waitFor(() => { })
    expect(screen.queryByText(/loading\.\.\./i)).not.toBeInTheDocument()  
  })

  test("renderizar todas as informaçoes do cartao", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock)
    
    render(<UserCard />)
    await waitFor(() => {
      expect(screen.getByText(/oleta abbott/i)).toBeInTheDocument()
      expect(screen.getByText(/3589 6409 4947 0047/i)).toBeInTheDocument()
      expect(screen.getByText(/10\/23/i)).toBeInTheDocument()  
     })
    screen.logTestingPlaygroundURL()
  })
})