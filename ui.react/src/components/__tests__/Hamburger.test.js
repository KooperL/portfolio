import { Button } from "../Button"
import React from "react"
import renderer from "react-test-renderer"
import dark from "../../state/colorScheme/dark.json"
import Hamburger from "../Hamburger"

describe("Hamburger component", () => {
  test("it matches the snapshot", () => {
    const tree = renderer
      .create(
        <Hamburger
          data={[
            {
              destination: "/",
              label: "test1",
              callback: () => {},
            },
            {
              destination: "/",
              label: "test2",
              callback: () => {},
            },
          ]}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
