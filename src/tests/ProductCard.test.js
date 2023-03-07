import { render, waitFor, screen } from "@testing-library/react"
import ProductCard from "../components/ProductCard"
import axios from "axios"

jest.mock("axios") // módulo inteiro mockado

const axiosResponseMock = {
  data: {
    title: "MacBook Pro",
    description: "Descrição mockada",
    price: 1749,
    thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png"
  }
}

describe("ProductCard", () => {
  //prática 1
  test("renderizar", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock)

    render(<ProductCard />)
    // screen.debug()
    await waitFor(() => { })
    // screen.debug()
  })

  //prática 2
  test("renderizar o carregamento inicial", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock)

    render(<ProductCard />)
    // screen.logTestingPlaygroundURL()
    const loading = screen.getByText(/loading\.\.\./i)
    expect(loading).toBeInTheDocument()

    expect(screen.queryByText(/macBook pro/i)).not.toBeInTheDocument()
  })

  //prática 3
  test("renderizar o card corretamente apos carregamento", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock)

    render(<ProductCard />)

    //espera a resposta da requisiçao durante 1 segundo
    await waitFor(() => {
      //expects podem ficar dentro da callback ou fora, so é necessario respeitar a ordem do codigo
      expect(screen.getByRole('heading', {
        name: /macbook pro/i
      })).toBeInTheDocument()

      expect(screen.getByRole('img', {
        name: /thumbnail for macbook pro/i
      })).toBeInTheDocument()

      
    })
    //expects testados depois do 1 segundo
    expect(screen.getByText(/descrição mockada/i)).toBeInTheDocument()
    expect(screen.getByText(/\$1749/i)).toBeInTheDocument()

    const loading = screen.queryByText(/loading\.\.\./i)
    expect(loading).not.toBeInTheDocument()
  })
})