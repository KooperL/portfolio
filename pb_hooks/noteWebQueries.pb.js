routerAdd("post", "api/custom/notes/:noteId/share", c => {
  try {
    let user = $apis.requestInfo(c)?.authRecord?.id
    if (!user) {
      return c.json(401, {
        code: 401,
      })
    }
    const message = new MailerMessage({
      from: {
        address: $app.settings().meta.senderAddress,
        name: $app.settings().meta.senderName,
      },
      to: [{ address: "kooper.lingohr@gmail.com" }],
      subject: "YOUR_SUBJECT...",
      html: "YOUR_HTML_BODY...",
    })

    $app.newMailClient().send(message)

    return c.json(200, {
      code: 200,
    })
  } catch (e) {
    return c.json(500, {
      code: 500,
      message: e,
    })
  }
})

routerAdd("post", "api/custom/notes/:noteId/rating", c => {
  try {
    let id = c.pathParam("noteId")
    let user = $apis.requestInfo(c)?.authRecord?.id
    const data = $apis.requestInfo(c).data
    if (!user) {
      return c.json(500, {
        code: 401,
        message: "not authenticated",
      })
    }
    const ratingExists = new DynamicModel({
      cnt: 0,
    })

    $app
      .dao()
      .db()
      .newQuery(
        `SELECT COALESCE(count(*), 0) as cnt FROM ratings WHERE note = {:noteId} AND user = {:userId};`,
      )
      .bind({
        noteId: id,
        userId: user,
      })
      .one(ratingExists)

    if (ratingExists.cnt === 1) {
      const existingRow = $app
        .dao()
        .findFirstRecordByFilter(
          "ratings",
          "note = {:noteId} && user = {:userId}",
          {
            noteId: id,
            userId: user,
          },
        )
      existingRow.set("score", data.score)
      $app.dao().saveRecord(existingRow)
    } else {
      const collection = $app.dao().findCollectionByNameOrId("ratings")

      const record = new Record(collection, {
        user: user,
        note: id,
        score: +data.score,
      })

      $app.dao().saveRecord(record)
    }

    return c.json(200, {
      code: 200,
    })
  } catch (e) {
    return c.json(500, {
      code: 500,
      message: JSON.stringify(e),
    })
  }
})

routerAdd("get", "api/custom/notes/:noteId/ratings", c => {
  let id = c.pathParam("noteId")
  let user = $apis.requestInfo(c)?.authRecord?.id
  const NULL = -1

  const globalResult = new DynamicModel({
    totalRating: NULL,
    averageRating: NULL,
    summedRating: NULL,
  })
  const userResult = arrayOf(
    new DynamicModel({
      id: "",
      score: 0,
    }),
  )

  try {
    $app
      .dao()
      .db()
      .newQuery(
        `SELECT COUNT(score) AS totalRating, COALESCE(AVG(score), ${NULL}) AS averageRating, COALESCE(SUM(score), ${NULL}) AS summedRating FROM ratings WHERE note={:noteId};`,
      )
      .bind({
        noteId: id,
      })
      .one(globalResult)

    if (user) {
      $app
        .dao()
        .db()
        .select("id")
        .andSelect("score")
        .from("ratings")
        .where($dbx.exp("user = {:userId}", { userId: user }))
        .andWhere($dbx.exp("note = {:noteId}", { noteId: id }))
        .all(userResult)
    }

    const postsCollection = $app.dao().findCollectionByNameOrId("noteViews")
    const newView = new Record(postsCollection, {
      note: id,
      user: $apis.requestInfo(c)?.authRecord?.id,
    })
    $app.dao().saveRecord(newView)

    return c.json(200, {
      code: 200,
      data: { ...(user && { userRating: userResult?.[0] }), ...globalResult },
    })
  } catch (e) {
    console.error(e)
    return c.json(500, {
      code: 500,
      message: e,
    })
  }
})
