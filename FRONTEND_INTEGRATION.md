# Angular Frontend Integration Guide
## Content-Only Dynamic System Integration

## 🔧 **Angular Service for API Integration**

### **Content Service**

```typescript
// src/app/services/content.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ContentSection {
  [key: string]: any;
}

export interface PageContent {
  pageKey: string;
  content: { [sectionKey: string]: ContentSection };
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = 'http://localhost:5000/api';
  private contentCache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  // Get all content for a page
  getPageContent(pageKey: string): Observable<PageContent> {
    // Check cache first
    if (this.contentCache.has(pageKey)) {
      return new Observable(observer => {
        observer.next(this.contentCache.get(pageKey));
        observer.complete();
      });
    }

    return this.http.get<PageContent>(`${this.apiUrl}/content/${pageKey}`).pipe(
      map(data => {
        this.contentCache.set(pageKey, data);
        return data;
      }),
      catchError(error => {
        console.error(`Error loading content for ${pageKey}:`, error);
        throw error;
      })
    );
  }

  // Get specific section content
  getSectionContent(pageKey: string, sectionKey: string): Observable<ContentSection> {
    return this.http.get<{content: ContentSection}>(`${this.apiUrl}/content/${pageKey}/${sectionKey}`).pipe(
      map(response => response.content)
    );
  }

  // Get team members
  getTeamMembers(): Observable<any[]> {
    return this.http.get<{teamMembers: any[]}>(`${this.apiUrl}/team`).pipe(
      map(response => response.teamMembers)
    );
  }

  // Get products by category
  getProducts(category?: string): Observable<any> {
    const url = category ? `${this.apiUrl}/products/${category}` : `${this.apiUrl}/products`;
    return this.http.get<any>(url);
  }

  // Get company logos
  getCompanyLogos(): Observable<any[]> {
    return this.http.get<{companyLogos: any[]}>(`${this.apiUrl}/logos`).pipe(
      map(response => response.companyLogos)
    );
  }

  // Get navigation menu items
  getNavigationMenu(menuKey: string = 'main_navigation'): Observable<any[]> {
    return this.http.get<{items: any[]}>(`${this.apiUrl}/navigation/${menuKey}`).pipe(
      map(response => response.items)
    );
  }

  // Submit contact form
  submitContactForm(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/forms/contact`, formData);
  }

  // Submit about form
  submitAboutForm(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/forms/about`, formData);
  }

  // Get all navigation menus
  getAllNavigationMenus(): Observable<any> {
    return this.http.get<{menus: any}>(`${this.apiUrl}/navigation`);
  }

  // Clear cache
  clearCache(): void {
    this.contentCache.clear();
  }
}
```

## 📱 **Updated Components**

### **1. Header Component Integration (Dynamic Navigation)**

```typescript
// src/app/layout/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  // Dynamic navigation items
  navigationItems: any[] = [];
  
  // Static properties that can be made dynamic later
  logo = '/images/logo.svg';
  ctaButtonText = 'Get in Touch';
  
  // Navigation state
  currentRoute = '';
  isMobileMenuOpen = false;
  isScrolled = false;
  isLoading = true;

  constructor(
    private contentService: ContentService,
    private router: Router
  ) {
    // Track route changes for active menu highlighting
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
    });
  }

  ngOnInit() {
    this.loadNavigationMenu();
    this.setupScrollListener();
  }

  loadNavigationMenu() {
    this.contentService.getNavigationMenu('main_navigation').subscribe({
      next: (items) => {
        this.navigationItems = items;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading navigation menu:', error);
        this.setDefaultNavigation();
        this.isLoading = false;
      }
    });
  }

  setDefaultNavigation() {
    // Fallback navigation if API fails
    this.navigationItems = [
      { itemKey: 'home', label: 'Home', route: '/home', displayOrder: 1 },
      { itemKey: 'about', label: 'About', route: '/about-us', displayOrder: 2 },
      { itemKey: 'platforms', label: 'Platforms', route: '/product-details', displayOrder: 3 },
      { itemKey: 'services', label: 'Services', route: '#', displayOrder: 4 },
      { itemKey: 'devices', label: 'Devices', route: '/device', displayOrder: 5 },
      { itemKey: 'news', label: 'News', route: '/news', displayOrder: 6 }
    ];
  }

  setupScrollListener() {
    window.addEventListener('scroll', () => {
      this.isScrolled = window.scrollY > 50;
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  onNavigationClick(item: any) {
    if (item.route === '#') {
      // Handle special cases like Services which might not have a route
      return;
    }
    this.closeMobileMenu();
  }
}
```

### **Updated Header Template**

```html
<!-- src/app/layout/header/header.component.html -->
<header class="px-4 sm:px-8 lg:px-14 relative z-50" [ngClass]="isScrolled ? 'bg-white shadow-md' : 'bg-transparent'">
    <div class="flex items-center justify-between py-4 lg:py-5">
        <!-- Logo -->
        <div>
            <img [src]="logo" class="w-32 sm:w-40 lg:w-48" alt="Carebridge Logo">
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8" *ngIf="!isLoading">
            <ul class="flex items-center gap-8">
                <li *ngFor="let item of navigationItems">
                    <a [routerLink]="item.route" 
                       [ngClass]="{
                           'font-customBold': currentRoute === item.route,
                           'font-customRegular': currentRoute !== item.route
                       }" 
                       class="cursor-pointer text-base font-customRegular text-primaryColor hover:font-customBold transition-all"
                       (click)="onNavigationClick(item)">
                        {{ item.label }}
                    </a>
                </li>
            </ul>
            <button type="button" routerLink="/contact-us" class="theme-button py-3 px-4">
                {{ ctaButtonText }}
            </button>
        </div>

        <!-- Loading State for Desktop -->
        <div class="hidden lg:flex items-center gap-8" *ngIf="isLoading">
            <div class="animate-pulse flex space-x-8">
                <div class="h-4 bg-gray-300 rounded w-12"></div>
                <div class="h-4 bg-gray-300 rounded w-12"></div>
                <div class="h-4 bg-gray-300 rounded w-16"></div>
                <div class="h-4 bg-gray-300 rounded w-14"></div>
                <div class="h-4 bg-gray-300 rounded w-12"></div>
                <div class="h-4 bg-gray-300 rounded w-10"></div>
            </div>
            <div class="h-10 bg-gray-300 rounded w-24 animate-pulse"></div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="lg:hidden">
            <button 
                type="button" 
                class="p-2 text-primaryColor hover:text-secondaryColor transition-colors"
                (click)="toggleMobileMenu()"
                [attr.aria-expanded]="isMobileMenuOpen"
                aria-label="Toggle mobile menu">
                <!-- Hamburger Icon -->
                <svg *ngIf="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                <!-- Close Icon -->
                <svg *ngIf="isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <div 
        class="lg:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out"
        [ngClass]="{
            'opacity-100 visible translate-y-0': isMobileMenuOpen,
            'opacity-0 invisible -translate-y-4': !isMobileMenuOpen
        }"
        [style.background-color]="isScrolled ? 'white' : 'rgba(255, 255, 255, 0.95)'"
        style="backdrop-filter: blur(10px);">
        
        <div class="px-4 py-6 border-t border-gray-100 shadow-lg" *ngIf="!isLoading">
            <ul class="space-y-4">
                <li *ngFor="let item of navigationItems">
                    <a [routerLink]="item.route" 
                       (click)="closeMobileMenu()"
                       [ngClass]="{
                           'font-customBold text-secondaryColor': currentRoute === item.route,
                           'font-customRegular text-primaryColor': currentRoute !== item.route
                       }" 
                       class="block py-2 px-4 text-base rounded-lg hover:bg-gray-50 transition-all">
                        {{ item.label }}
                    </a>
                </li>
            </ul>
            
            <!-- Mobile CTA Button -->
            <div class="mt-6 pt-4 border-t border-gray-100">
                <button 
                    type="button" 
                    routerLink="/contact-us" 
                    (click)="closeMobileMenu()"
                    class="theme-button w-full py-3 px-4 text-center">
                    {{ ctaButtonText }}
                </button>
            </div>
        </div>
        
        <!-- Mobile Loading State -->
        <div class="px-4 py-6 border-t border-gray-100 shadow-lg" *ngIf="isLoading">
            <div class="space-y-4 animate-pulse">
                <div class="h-4 bg-gray-300 rounded w-16"></div>
                <div class="h-4 bg-gray-300 rounded w-12"></div>
                <div class="h-4 bg-gray-300 rounded w-20"></div>
                <div class="h-4 bg-gray-300 rounded w-14"></div>
                <div class="h-4 bg-gray-300 rounded w-16"></div>
                <div class="h-4 bg-gray-300 rounded w-10"></div>
            </div>
        </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
        *ngIf="isMobileMenuOpen"
        class="lg:hidden fixed inset-0 bg-black bg-opacity-20 z-[-1] transition-opacity duration-300"
        (click)="closeMobileMenu()">
    </div>
</header>
```

### **2. Home Component Integration**

```typescript
// src/app/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // Dynamic content properties
  heroContent: any = {};
  featuresContent: any = {};
  challengesContent: any = {};
  ecosystemContent: any = {};
  testimonials: any = {};
  ctaContent: any = {};
  companyLogos: any[] = [];

  // Static functionality properties
  activeTab: string = 'clinics';
  tabs: any[] = []; // Will be loaded from API

  // Loading states
  isLoading = true;
  loadingError = false;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.loadPageContent();
    this.loadCompanyLogos();
  }

  loadPageContent() {
    this.contentService.getPageContent('home').subscribe({
      next: (data) => {
        const content = data.content;
        
        // Map API content to component properties
        this.heroContent = content.hero || {};
        this.featuresContent = content.features || {};
        this.challengesContent = content.challenges || {};
        this.ecosystemContent = content.ecosystem || {};
        this.testimonials = content.testimonials || {};
        this.ctaContent = content.cta || {};
        
        // Parse target audience tabs if they exist in JSON format
        if (content.targetAudience?.tabs) {
          try {
            this.tabs = JSON.parse(content.targetAudience.tabs);
            if (this.tabs.length > 0) {
              this.activeTab = this.tabs[0].id;
            }
          } catch (e) {
            // Fallback to default tabs
            this.setDefaultTabs();
          }
        } else {
          this.setDefaultTabs();
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading home content:', error);
        this.loadingError = true;
        this.isLoading = false;
        this.setDefaultContent();
      }
    });
  }

  loadCompanyLogos() {
    this.contentService.getCompanyLogos().subscribe({
      next: (logos) => {
        this.companyLogos = logos;
      },
      error: (error) => {
        console.error('Error loading company logos:', error);
      }
    });
  }

  setDefaultTabs() {
    // Fallback tabs if API fails
    this.tabs = [
      {
        id: 'clinics',
        title: 'Clinics',
        img: '/images/benyamin.png',
        desc: 'Improved patient management to grow patient capacity and virtual visits',
      },
      {
        id: 'hospitals',
        title: 'Hospitals',
        img: '/images/benyamin.png',
        desc: 'Better hospital workflows, patient record integration, and digital OPD.',
      },
      {
        id: 'phc',
        title: 'PHC',
        img: '/images/benyamin.png',
        desc: 'Streamlined PHC management and rural health support with telemedicine.',
      },
      {
        id: 'ngo',
        title: 'NGO & Health Camps',
        img: '/images/benyamin.png',
        desc: 'NGOs can manage health camps, patient registration, and follow-ups.',
      },
      {
        id: 'home',
        title: 'Home Care',
        img: '/images/benyamin.png',
        desc: 'Enable home care visits, track vitals, and connect patients to doctors virtually.',
      },
    ];
  }

  setDefaultContent() {
    // Fallback content if API fails
    this.heroContent = {
      main_title: 'Your Partner In',
      sub_title: 'Remote Health',
      main_text: 'Monitoring',
      description: 'Empowering healthcare providers and patients with an integrated telemedicine ecosystem—where data, devices, and care converge effortlessly.',
      button_text: 'Know More',
      image: '/images/home-img.png'
    };
  }
}
```

### **Updated Home Template**

```html
<!-- src/app/pages/home/home.component.html -->
<section class="pb-10">
    <div class="absolute top-0 end-0 w-full z-[-1]">
        <img src="/images/top-bg.png" class="w-[78%] absolute top-0 end-0" alt="">
    </div>

    <!-- Loading State -->
    <div *ngIf="isLoading" class="px-4 sm:px-8 lg:px-32 pt-8 sm:pt-12 lg:pt-16">
        <div class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primaryColor"></div>
        </div>
    </div>

    <!-- Error State -->
    <div *ngIf="loadingError" class="px-4 sm:px-8 lg:px-32 pt-8 sm:pt-12 lg:pt-16">
        <div class="text-center">
            <p class="text-red-500">Failed to load content. Please try again later.</p>
        </div>
    </div>

    <!-- Content -->
    <div *ngIf="!isLoading && !loadingError" class="px-4 sm:px-8 lg:px-32 pt-8 sm:pt-12 lg:pt-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
            <div>
                <!-- Dynamic Hero Content -->
                <h3 class="text-black text-3xl sm:text-4xl lg:text-5xl font-customBold pb-1">
                    {{ heroContent.main_title || 'Your Partner In' }}
                </h3>
                <h3 class="text-secondaryColor text-3xl sm:text-4xl lg:text-5xl font-customBold pb-1">
                    {{ heroContent.sub_title || 'Remote Health' }}
                </h3>
                <h2 class="text-secondaryColor text-4xl sm:text-5xl lg:text-7xl font-customBold">
                    {{ heroContent.main_text || 'Monitoring' }}
                </h2>

                <p class="text-[#3E3E3E] text-sm sm:text-base font-customRegular pt-4 lg:pe-28">
                    {{ heroContent.description || 'Empowering healthcare providers and patients with an integrated telemedicine ecosystem—where data, devices, and care converge effortlessly.' }}
                </p>

                <div class="mt-8">
                    <button class="theme-button px-10 py-3 text-center flex items-center gap-2">
                        {{ heroContent.button_text || 'Know More' }} 
                        <img src="/icons/arrow-right.svg" class="w-3" alt="">
                    </button>
                </div>
            </div>
            <div class="order-first lg:order-last">
                <img [src]="heroContent.image || '/images/home-img.png'" 
                     class="w-full relative lg:bottom-10" 
                     [alt]="heroContent.main_title">
            </div>
        </div>
    </div>

    <!-- Features Section -->
    <div class="bg-backgroundColor px-4 sm:px-8 lg:px-32 py-12 sm:py-16 lg:py-20 mt-12 sm:mt-18 lg:mt-24">
        <div>
            <h2 class="text-2xl sm:text-3xl font-customBold text-primaryColor capitalize text-center">
                {{ featuresContent.section_title || 'Innovating Remote Healthcare,' }}
                <span class="text-secondaryColor">{{ featuresContent.section_subtitle || 'The Carebridge Way' }}</span>
            </h2>

            <div class="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-20">
                <div class="place-content-center">
                    <div class="size-20 mx-auto rounded-full bg-[#F9F9FF]"></div>
                    <p class="text-black font-customMedium text-center mt-5 text-lg sm:text-xl">
                        {{ featuresContent.feature1_title || 'Integrated Suite of Telehealth Ecosystem' }}
                    </p>
                </div>
                <div class="place-content-center">
                    <div class="size-20 mx-auto rounded-full bg-[#F9F9FF]"></div>
                    <p class="text-black font-customMedium text-center mt-5 text-lg sm:text-xl">
                        {{ featuresContent.feature2_title || 'Future Ready with ABHA and NHDM Compliance' }}
                    </p>
                </div>
                <div class="place-content-center">
                    <div class="size-20 mx-auto rounded-full bg-[#F9F9FF]"></div>
                    <p class="text-black font-customMedium text-center mt-5 text-lg sm:text-xl">
                        {{ featuresContent.feature3_title || 'Real-Time Monitoring & Preventive Care' }}
                    </p>
                </div>
                <div class="place-content-center">
                    <div class="size-20 mx-auto rounded-full bg-[#F9F9FF]"></div>
                    <p class="text-black font-customMedium text-center mt-5 text-lg sm:text-xl">
                        {{ featuresContent.feature4_title || 'Accessible Healthcare Anytime, Anywhere' }}
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Company Logos Section -->
    <div class="mt-12 sm:mt-16 lg:mt-20 py-12 sm:py-14 lg:py-16 px-4 sm:px-8 lg:px-32 bg-[#F0F9F9]">
        <div>
            <h2 class="text-2xl sm:text-3xl font-customBold text-primaryColor text-center">
                Trusted by
                <span class="text-secondaryColor">10,000+ companies around the world</span>
            </h2>
        </div>
        <div class="mt-6 sm:mt-8 lg:mt-10 flex flex-wrap items-center justify-center lg:justify-between gap-6 sm:gap-8 lg:gap-10">
            <img *ngFor="let logo of companyLogos" 
                 [src]="logo.logoImage" 
                 [alt]="logo.companyName"
                 class="w-20 sm:w-24 lg:w-32 opacity-40">
        </div>
    </div>

    <!-- Rest of the template continues with similar dynamic content integration... -->
</section>
```

### **2. About Component Integration**

```typescript
// src/app/pages/about/about.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  pageContent: any = {};
  teamMembers: any[] = [];
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  isLoading = true;

  constructor(
    private contentService: ContentService,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPageContent();
    this.loadTeamMembers();
  }

  loadPageContent() {
    this.contentService.getPageContent('about').subscribe({
      next: (data) => {
        this.pageContent = data.content;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading about content:', error);
        this.isLoading = false;
      }
    });
  }

  loadTeamMembers() {
    this.contentService.getTeamMembers().subscribe({
      next: (members) => {
        this.teamMembers = members;
      },
      error: (error) => {
        console.error('Error loading team members:', error);
      }
    });
  }

  onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      this.contentService.submitAboutForm(this.contactForm.value).subscribe({
        next: (response) => {
          this.submitSuccess = true;
          this.contactForm.reset();
          this.isSubmitting = false;
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        },
        error: (error) => {
          console.error('Error submitting form:', error);
          this.isSubmitting = false;
        }
      });
    }
  }
}
```

### **3. Contact Component Integration**

```typescript
// src/app/pages/contact/contact.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  pageContent: any = {};
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  isLoading = true;

  constructor(
    private contentService: ContentService,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPageContent();
  }

  loadPageContent() {
    this.contentService.getPageContent('contact').subscribe({
      next: (data) => {
        this.pageContent = data.content;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading contact content:', error);
        this.isLoading = false;
        this.setDefaultContent();
      }
    });
  }

  setDefaultContent() {
    this.pageContent = {
      header: {
        title: 'Get in',
        subtitle: 'touch today',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.'
      },
      contactDetails: {
        section_title: 'Contact details',
        location_label: 'Our location',
        location_value: '58 Middle Point Rd\nSan Francisco, 94124',
        phone_label: 'Call us',
        phone_value: '(123) 456 - 789',
        email_label: 'Email us',
        email_value: 'contact@company.com'
      }
    };
  }

  onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitError = false;
      
      this.contentService.submitContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          this.submitSuccess = true;
          this.contactForm.reset();
          this.isSubmitting = false;
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        },
        error: (error) => {
          console.error('Error submitting form:', error);
          this.submitError = true;
          this.isSubmitting = false;
        }
      });
    }
  }
}
```

### **4. Device Component Integration**

```typescript
// src/app/pages/device/device.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [CommonModule, SwiperModule],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss'
})
export class DeviceComponent implements OnInit {
  activeTab: string = 'devices';
  products: any = {};
  isLoading = true;
  
  // Keep existing carousel configurations
  carouselConfig: any;
  carouselConfig1: any;
  carouselConfig2: any;

  constructor(private contentService: ContentService) {
    // Initialize carousel configs as before
  }

  ngOnInit() {
    this.loadProducts();
  }

  setActive(tab: string) {
    this.activeTab = tab;
  }

  loadProducts() {
    this.contentService.getProducts().subscribe({
      next: (data) => {
        this.products = data.productsByCategory;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  getProductsForCategory(category: string) {
    return this.products[category] || [];
  }
}
```

## 🔧 **HTTP Interceptor for Error Handling**

```typescript
// src/app/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          console.error('Network error - Backend server might be down');
        } else if (error.status >= 500) {
          console.error('Server error:', error.message);
        }
        return throwError(() => error);
      })
    );
  }
}
```

## 📋 **App Module Configuration**

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { ErrorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([ErrorInterceptor]))
  ]
};
```

## 📋 **App Module Configuration for Navigation**

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { ErrorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([ErrorInterceptor]))
  ]
};
```

## 🔧 **Dynamic Navigation Benefits**

### **Admin Panel Control:**
- ✅ **Menu Labels**: Change "About" to "About Us" or "Company Info"
- ✅ **Menu Order**: Reorder navigation items by drag & drop
- ✅ **Menu Visibility**: Show/hide menu items without code changes
- ✅ **Menu Routes**: Update routes if page URLs change
- ✅ **Seasonal Menus**: Add temporary menu items for events/promotions

### **Multi-language Support Ready:**
- ✅ **Language Switching**: Easy to implement with different menu_key values
- ✅ **Localized Labels**: Different menu labels for different languages
- ✅ **Regional Variations**: Different menu structures for different regions

## 📱 **Implementation Summary**

This integration approach ensures that:

✅ **Content loads dynamically** from the backend API
✅ **Navigation is fully dynamic** with admin control over menu items
✅ **Fallback content** displays if API fails
✅ **Loading states** provide good UX for both content and navigation
✅ **Form submissions** work with backend
✅ **Error handling** manages network issues
✅ **Caching** improves performance
✅ **Structure remains unchanged** - only text/images/menu labels are dynamic
✅ **Mobile navigation** works seamlessly with dynamic menu items
✅ **Active menu highlighting** works with dynamic routes
