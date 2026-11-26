<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@workspace/ui-vue/components/sidebar"
import { Icon } from "@workspace/ui-vue/icons"
</script>

<template>
  <section id="sidebar" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Sidebar</h2>

    <!-- Static: collapsible="none", every part in flow so styles can be compared. -->
    <div class="h-[760px] w-fit" data-specimen="sidebar-static-wrap">
      <SidebarProvider class="h-full min-h-0 w-fit">
        <Sidebar collapsible="none" class="border-r-(length:--pl-border-width) border-sidebar-border" data-specimen="sidebar-static">
          <SidebarHeader data-specimen="sb-header">
            <SidebarInput placeholder="Search" data-specimen="sb-input" />
          </SidebarHeader>
          <SidebarContent data-specimen="sb-content">
            <SidebarGroup data-specimen="sb-group">
              <SidebarGroupLabel data-specimen="sb-group-label">Reports</SidebarGroupLabel>
              <SidebarGroupAction aria-label="Add report" data-specimen="sb-group-action"><Icon name="plus" /></SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton data-specimen="sb-item"><Icon name="home" /><span>Overview</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem data-specimen="sb-item-active-wrap">
                    <SidebarMenuButton is-active data-specimen="sb-item-active"><Icon name="chart-line" /><span>Reach</span></SidebarMenuButton>
                    <SidebarMenuBadge data-specimen="sb-badge">12</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton data-specimen="sb-item-action"><Icon name="bar-chart" /><span>Frequency</span></SidebarMenuButton>
                    <SidebarMenuAction aria-label="More" data-specimen="sb-action"><Icon name="more" /></SidebarMenuAction>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="sm" data-specimen="sb-item-sm"><Icon name="clock" /><span>Recent</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg" data-specimen="sb-item-lg"><Icon name="star" /><span>Starred</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton variant="outline" data-specimen="sb-item-outline"><Icon name="folder" /><span>Folders</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton disabled data-specimen="sb-item-disabled"><Icon name="database" /><span>Sources</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton data-specimen="sb-item-parent"><Icon name="settings" /><span>Settings</span></SidebarMenuButton>
                    <SidebarMenuSub data-specimen="sb-sub">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" is-active data-specimen="sb-sub-active"><span>Profile</span></SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" data-specimen="sb-sub-item"><span>Billing</span></SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" size="sm" data-specimen="sb-sub-sm"><span>Team</span></SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator data-specimen="sb-separator" />
            <SidebarGroup>
              <SidebarGroupLabel>Loading</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem><SidebarMenuSkeleton show-icon data-specimen="sb-skeleton" /></SidebarMenuItem>
                  <SidebarMenuItem><SidebarMenuSkeleton /></SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter data-specimen="sb-footer">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton><Icon name="users" /><span>Account</span></SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </div>

    <!-- Interactive: collapsible="icon" inside a transformed box so the fixed sidebar stays in the box. -->
    <div class="relative h-96 overflow-hidden border border-border [transform:translateZ(0)]" data-specimen="sidebar-demo-wrap">
      <SidebarProvider class="h-full min-h-0">
        <Sidebar collapsible="icon" class="h-full" data-specimen="sidebar-demo">
          <SidebarHeader>
            <SidebarTrigger data-specimen="sb-trigger" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Reports</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton is-active tooltip="Reach" data-specimen="sb-demo-item"><Icon name="chart-line" /><span>Reach</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Frequency"><Icon name="bar-chart" /><span>Frequency</span></SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset class="p-6">
          <p class="text-body-sm">Page content. Press Cmd or Ctrl B to toggle the sidebar.</p>
        </SidebarInset>
      </SidebarProvider>
    </div>
  </section>
</template>
