<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui-vue/components/breadcrumb"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/ui-vue/components/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationStatus,
} from "@workspace/ui-vue/components/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui-vue/components/tabs"

const reports = [
  ["Reach", "Share of adults who saw the campaign."],
  ["Frequency", "Average exposures per person."],
  ["Impressions", "Total exposures by city."],
  ["Audience", "Who passed the screens."],
]
</script>

<template>
  <section id="nav" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Navigation: Tabs, Breadcrumb, Pagination, Navigation Menu</h2>

    <div class="flex flex-col gap-6">
      <Tabs default-value="overview" data-specimen="tabs-default">
        <TabsList data-specimen="tabs-list-default">
          <TabsTrigger value="overview" data-specimen="tab-default-active">Overview</TabsTrigger>
          <TabsTrigger value="cities" data-specimen="tab-default-idle">Cities</TabsTrigger>
          <TabsTrigger value="export" disabled data-specimen="tab-default-disabled">Export</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview panel</TabsContent>
        <TabsContent value="cities">Cities panel</TabsContent>
      </Tabs>

      <Tabs default-value="overview">
        <TabsList variant="line" data-specimen="tabs-list-line">
          <TabsTrigger value="overview" data-specimen="tab-line-active">Overview</TabsTrigger>
          <TabsTrigger value="cities" data-specimen="tab-line-idle">Cities</TabsTrigger>
          <TabsTrigger value="export" disabled data-specimen="tab-line-disabled">Export</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview panel</TabsContent>
        <TabsContent value="cities">Cities panel</TabsContent>
      </Tabs>

      <Tabs default-value="overview" orientation="vertical">
        <TabsList variant="line" data-specimen="tabs-list-vertical">
          <TabsTrigger value="overview" data-specimen="tab-vertical-active">Overview</TabsTrigger>
          <TabsTrigger value="cities" data-specimen="tab-vertical-idle">Cities</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview panel</TabsContent>
        <TabsContent value="cities">Cities panel</TabsContent>
      </Tabs>
    </div>

    <Breadcrumb data-specimen="breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#">Reports</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Roadside reach</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <Pagination data-specimen="pagination">
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#" is-active>2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationLink href="#">12</PaginationLink></PaginationItem>
        <PaginationStatus :page="2" :page-count="12" />
        <PaginationItem><PaginationNext href="#" /></PaginationItem>
      </PaginationContent>
    </Pagination>

    <NavigationMenu data-specimen="navmenu">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger data-specimen="nm-trigger">Reports</NavigationMenuTrigger>
          <NavigationMenuContent data-specimen="nm-content">
            <ul class="grid w-96 grid-cols-2 gap-1">
              <li v-for="[t, d] in reports" :key="t">
                <NavigationMenuLink href="#">
                  <span class="font-semibold text-ink-heading">{{ t }}</span>
                  <span class="text-caption text-muted-foreground">{{ d }}</span>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Cities</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="flex w-56 flex-col gap-1">
              <li v-for="c in ['Jakarta', 'Surabaya', 'Bandung']" :key="c"><NavigationMenuLink href="#">{{ c }}</NavigationMenuLink></li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" active :class="navigationMenuTriggerStyle()" data-specimen="nm-active">Dashboard</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" :class="navigationMenuTriggerStyle()" data-specimen="nm-link">Docs</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </section>
</template>
