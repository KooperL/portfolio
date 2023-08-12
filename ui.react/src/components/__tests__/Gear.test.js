import React from "react"
import renderer from "react-test-renderer"
import dark from "../../state/colorScheme/dark.json"
import { Gear } from "../Gear"

describe("Gear component", () => {
  test("it matches the snapshot", () => {
    const treeSmall = renderer.create(<Gear variant="small" />).toJSON()
    expect(treeSmall).toMatchSnapshot()
    // const treeLarge = renderer.create(<Gear variant='large' />).toJSON();
    // expect(treeLarge).toMatchSnapshot();
  })
})
