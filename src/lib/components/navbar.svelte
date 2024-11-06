<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Button,
    Modal,
    Label,
    Input,
    DarkMode,
    Checkbox,
    Progressbar,
    Marquee,
  } from "flowbite-svelte";
  import {
    AtomOutline,
    CodeMergeOutline,
    CodeOutline,
    DatabaseOutline,
    DesktopPcOutline,
    DnaOutline,
    HeadphonesOutline,
    HomeOutline,
    HomeSolid,
    KeyboardOutline,
    MobilePhoneOutline,
    ProfileCardOutline,
    RocketOutline,
    StarOutline,
    TerminalOutline,
    UserCircleOutline,
    UserSolid,
  } from "flowbite-svelte-icons";
  import { pb, currentUser } from "../pocketbase";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { site } from "$lib/config";
  import { logger } from "$lib/logger";
    import { base } from "$app/paths";


  let openLoginModalAttempted = false;
  let logoutModalAttempted = false;
  let pendingUsernameChange = $currentUser?.model?.username;

  logger.info("navbar", "Navbar loaded");
</script>

<Navbar class="flex flex-row">
  <NavBrand
    data-test="nav-home"
    on:click={(e) => {
      logger.info("nav-bar", 'Press "home" button');
    }}
    href={base + '/'}
    class="w-20"
  >
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    >
      <HomeSolid
        class="text-primary-500 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 w-10 h-10"
        fill="primary-600"
      />
    </span>
  </NavBrand>
  <Marquee class="w-0 grow">
    <AtomOutline />
    <MobilePhoneOutline class="hidden md:block" />
    <ProfileCardOutline class="hidden md:block" />
    <CodeMergeOutline class="hidden md:block" />
    <CodeOutline />
    <DatabaseOutline />
    <DesktopPcOutline class="hidden md:block" />
    <DnaOutline class="hidden md:block" />
    <KeyboardOutline />
    <StarOutline class="hidden md:block" />
    <TerminalOutline />
  </Marquee>
  <div class="w-20 flex justify-end">
    <DarkMode class="w-10 h-10" />
  </div>
</Navbar>
