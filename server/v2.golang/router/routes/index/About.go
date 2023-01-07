package index

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/router/middleware"
	"net/http"
)

func About(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		res := []types.PagePopulateNode{
			{
				Data: []string{"Hi 👋 I'm Kooper, welcome to my website."},
				Type: "header",
			},
			{
				Data: []string{
					"I update it constantly to demonstrate my comprehension of programming and computer science.",
					"If you're just here for a quick visit, you might be more interested in browsing some of my favourite projects.",
				},
				Type: "subheader",
			},
			{
				Data: []string{"/projects."},
				Text: "/projects",
				Type: "button",
			},
			{
				Data: []string{
					"Initially created in July 2020 during my Honours year, this started from scratch as a hobby, secondary only to my studies. As I learned more, it ate more of my free time and continued to evolve. ",
					"It is designed with functionality and design over speed and SEO. This was a deliberate trade off to demonstrate experience with many technologies. ",
					"This is the perfect place for me to apply the skills and techniques I learn both recreationally and professionally. ",
					"Above all, creating this website, and making projects for it has taught me two things: 1) Each component of a website stack/CS domain is deep enough to spend an entire career to perfect, and 2) I want to spend my career in the frontend. ",
					"This is my roadmap's destination and ultimately this webiste will reflect where I place on that roadmap. ",
				},
				Type: "body",
			},
			{
				Data: []string{"Here's some information on what is being used to serve this website to you:"},
				Type: "body",
			},
			{
				Data: []string{
					"Domain registration and namespace mapping through GoDaddy 📝",
					"Servers are deployed and hosted on a VPS 🖥️",
					"Version control and storage managed with Git/Github 📆",
					"SSL certification and other security through Cloudflare 🕵️",
					"Sqlite (SQL) and MongoDB (noSQL) as databases/backends 💽",
					"Flask HTTP → WSGI server as a middleware API 🤖",
					"Front end is written with React in Typescript 💄",
					"Stack served to you and all with NGINX Unit 🧠",
				},
				Type: "unorderedList",
			},
		}

		middleware.BuildSuccessResponse(w, res)
	}
}
