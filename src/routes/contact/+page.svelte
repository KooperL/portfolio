<script lang="ts">
  import { pb } from '$lib/pocketbase'
	import { AccordionItem, Accordion, Card, Label, Input, Textarea, Button } from 'flowbite-svelte';
    let name = ''
    let email = ''
    let message = ''
    let submitted = false
    let submittedSuccessfully = false

    async function handleSubmit(event) {
      try {
        event.preventDefault()
        if (!name.length) {
            return
        }
        if (!message.length) {
            return
        }
        const payload = { name, email, message }
        submitted = true
        submittedSuccessfully = false 
        pb.collection('messages').create(payload)
        submittedSuccessfully = true
        submitted = false
      } catch (e) {
        console.error(e)
      }
    }
</script>

<div class="box-border p-8 w-full h-full">
	<Card class="w-full max-w-full h-full bg-white/50">
		<div class="flex flex-col space-y-4">
			<span class="text-4xl font-bold">Contact me</span>
            <form  on:submit={handleSubmit} >
                <div class="flex flex-col space-y-4">
                    <div>
                        <Label for="name">Name</Label>
                        <Input bind:value={name} type="text" id="name" name="name" required />
                    </div>
                    <div>
                        <Label for="email">Email (optional)</Label>
                        <Input bind:value={email} type="email" id="email" name="email" />
                    </div>
                    <div>
                        <Label for="message">Message</Label>
                        <Textarea bind:value={message} id="message" name="message" class="bg-gray-50 dark:bg-gray-600" required></Textarea>
                    </div>
                    <div class="flex">
                        <Button disabled={submitted} type="submit"class="w-48">Send</Button>
                        {#if submittedSuccessfully}
                            <div class="flex items-center justify-center w-12">✅</div>
                        {/if}
                    </div>
                </div>
            </form>
	</Card>
	</div>
