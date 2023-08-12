import React from "react"
import renderer from "react-test-renderer"
import dark from "../../state/colorScheme/dark.json"
import { Globe } from "../Globe"

describe("Globe component", () => {
  test("it matches the snapshot", () => {
    const treeSmall = renderer.create(<Globe variant="small" />).toJSON()
    expect(treeSmall).toMatchSnapshot()
    // const treeLarge = renderer.create(<Globe variant='large' />).toJSON();
    // expect(treeLarge).toMatchSnapshot();
  })
})
