<script lang="ts">
	import { AccordionItem, Accordion, Card, Label, Input, Textarea, Button } from 'flowbite-svelte';
    let name
    let email
    let message

    async function handleSubmit(event) {
        event.preventDefault()
        const payload = { name, email, message }

    }
</script>

<div class="box-border p-8 w-full h-full">
	<Card class="w-full max-w-full h-full bg-white/50">
		<div class="flex flex-col space-y-4">
			<span class="text-4xl font-bold">Contact me</span>
            <form>
                <div class="flex flex-col space-y-4">
                    <div>
                        <Label for="name">Name</Label>
                        <Input bind:value={name} type="text" id="name" name="name" />
                    </div>
                    <div>
                        <Label for="email">Email (optional)</Label>
                        <Input bind:value={email} type="email" id="email" name="email" />
                    </div>
                    <div>
                        <Label for="message">Message</Label>
                        <Textarea bind:value={message} id="message" name="message" class="bg-gray-50"></Textarea>
                    </div>
                    <div>
                        <Button type="submit" on:submit={handleSubmit} class="w-48">Send</Button>
                    </div>
                </div>
            </form>
	</Card>
	</div>