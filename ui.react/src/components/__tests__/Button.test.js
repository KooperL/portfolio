import { Button } from "../Button"
import React from "react"
import renderer from "react-test-renderer"
import dark from "../../containers/context/dark.json"

describe("Button component", () => {
  test("it matches the snapshot", () => {
    const tree = renderer.create(<Button colours={dark} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
