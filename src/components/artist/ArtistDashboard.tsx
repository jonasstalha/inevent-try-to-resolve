import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, Button, SafeAreaView, Platform, StatusBar, KeyboardAvoidingView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useArtistStore } from './ArtistStore';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { ArtistHeader } from './ArtistHeader';
import { Theme } from '@/src/constants/theme';
import { Calendar, Ticket, BarChart2, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const ArtistMobileApp = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const {
    gigs,
    categories,
    addGig,
    updateGig,
    deleteGig,
    addCategory,
    updateCategory,
    deleteCategory,
    settings,
    toggleDarkMode,
    toggleNotifications,
    updateLanguage,
    addPaymentMethod,
    removePaymentMethod,
    updateSecuritySettings,
  } = useArtistStore();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ type: string; name: string } | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [credits, setCredits] = useState(50);
  const [walletBalance, setWalletBalance] = useState(1250.00);

  const artistProfile = {
    name: "Creative Arts Studio",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    description: "Professional event services and creative solutions for your special moments",
    rating: 4.8,
    reviewsCount: 124
  };

  // Replace with marketplace categories from client CategorySelector
  const MARKETPLACE_CATEGORIES = [
    'Mariage',
    'Anniversaire',
    'Traiteur',
    'Musique',
    'Neggafa',
    'Conference',
    "Evenement d'entreprise",
    'Kermesse',
    'Henna',
    'Photographie',
    'Animation',
    'Decoration',
    'Buffet',
  ];

  const [newService, setNewService] = useState({
    title: '',
    description: '',
    basePrice: '',
    minQuantity: '1',
    maxQuantity: '10',
    category: '',
    images: [] as string[],
    addOns: [
      { name: '', price: '', type: 'checkbox' },
    ],
    providerName: artistProfile.name,
    providerAvatar: artistProfile.image,
    rating: 0,
    reviewCount: 0,
    isAvailable: true,
    location: '',
    defaultMessage: '',
    tags: '',
  });
  const [serviceImages, setServiceImages] = useState<string[]>([]);
  const [serviceOptions, setServiceOptions] = useState([
    { title: '', price: '', description: '' }
  ]);
  const [serviceLocation, setServiceLocation] = useState('');
  const [addOns, setAddOns] = useState([
    { name: '', price: '', type: 'checkbox' },
  ]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [minQuantity, setMinQuantity] = useState('1');
  const [maxQuantity, setMaxQuantity] = useState('10');
  const [defaultMessage, setDefaultMessage] = useState('');
  const [tags, setTags] = useState('');

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    ticketTypes: [{ name: 'Normal', price: '', quantity: '' }],
    flyer: null
  });

  const [coupon, setCoupon] = useState<{ code: string; discount: string; expires: string } | null>(null);
  const [couponDiscount, setCouponDiscount] = useState('');
  const [couponExpires, setCouponExpires] = useState('');

  // Image picker for service images
  const pickServiceImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setServiceImages([...serviceImages, ...result.assets.map(a => a.uri)]);
    }
  };
  const removeServiceImage = (uri: string) => {
    setServiceImages(serviceImages.filter(img => img !== uri));
  };

  // Add/remove service options
  const addServiceOption = () => {
    setServiceOptions([...serviceOptions, { title: '', price: '', description: '' }]);
  };
  const removeServiceOption = (idx: number) => {
    setServiceOptions(serviceOptions.filter((_, i) => i !== idx));
  };
  const updateServiceOption = (idx: number, field: 'title' | 'price' | 'description', value: string) => {
    const updated = [...serviceOptions];
    updated[idx][field] = value;
    setServiceOptions(updated);
  };

  // Add/remove add-ons
  const addAddOn = () => {
    setAddOns([...addOns, { name: '', price: '', type: 'checkbox' }]);
  };
  const removeAddOn = (idx: number) => {
    setAddOns(addOns.filter((_, i) => i !== idx));
  };
  const updateAddOn = (idx: number, field: 'name' | 'price' | 'type', value: string) => {
    const updated = [...addOns];
    updated[idx][field] = value;
    setAddOns(updated);
  };

  const addService = () => {
    if (credits < 5) {
      alert('Insufficient credits! You need 5 credits to publish a service.');
      return;
    }
    if (!selectedCategory || !newService.title || !newService.description || !newService.basePrice) return;
    addGig({
      title: newService.title,
      description: newService.description,
      category: selectedCategory.name, // Use category name as string
      basePrice: Number(newService.basePrice),
      images: serviceImages,
      options: serviceOptions.map(opt => ({
        id: Date.now().toString() + Math.random(),
        title: opt.title,
        price: Number(opt.price),
        description: opt.description,
      })),
      location: serviceLocation,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date(),
      artistId: '1', // TODO: Replace with actual artistId from context/auth
    });
    setCredits(credits - 5);
    setNewService({
      title: '',
      description: '',
      basePrice: '',
      minQuantity: '1',
      maxQuantity: '10',
      category: '',
      images: [],
      addOns: [{ name: '', price: '', type: 'checkbox' }],
      providerName: artistProfile.name,
      providerAvatar: artistProfile.image,
      rating: 0,
      reviewCount: 0,
      isAvailable: true,
      location: '',
      defaultMessage: '',
      tags: '',
    });
    setServiceImages([]);
    setServiceOptions([{ title: '', price: '', description: '' }]);
    setServiceLocation('');
    setSelectedCategory(null);
  };

  const addEvent = () => {
    if (credits < 10) {
      alert('Insufficient credits! You need 10 credits to publish an event.');
      return;
    }
    if (!newEvent.title || !newEvent.description || !newEvent.date) return;
    addGig({
      title: newEvent.title,
      description: newEvent.description,
      category: categories[0]?.name || '', // Use category name as string
      basePrice: 0,
      images: [],
      options: [],
      location: '',
      rating: 0,
      reviewCount: 0,
      createdAt: new Date(),
      artistId: '1', // TODO: Replace with actual artistId from context/auth
    });
    setCredits(credits - 10);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      ticketTypes: [{ name: 'Normal', price: '', quantity: '' }],
      flyer: null
    });
  };

  const addTicketType = () => {
    setNewEvent({
      ...newEvent,
      ticketTypes: [...newEvent.ticketTypes, { name: '', price: '', quantity: '' }]
    });
  };

  const updateTicketType = (index: number, field: 'name' | 'price' | 'quantity', value: string) => {
    const updatedTypes = [...newEvent.ticketTypes];
    updatedTypes[index][field] = value;
    setNewEvent({ ...newEvent, ticketTypes: updatedTypes });
  };

  const generateCouponCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCoupon({ code, discount: couponDiscount, expires: couponExpires });
  };

  const renderDashboard = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>$2,450</Text>
          <Text style={styles.statLabel}>Today's Revenue</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Upcoming Events</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Calendar size={24} color={Theme.colors.primary} />
            <Text style={styles.actionText}>Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ticket size={24} color={Theme.colors.primary} />
            <Text style={styles.actionText}>Tickets</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <BarChart2 size={24} color={Theme.colors.primary} />
            <Text style={styles.actionText}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Events</Text>
        <View style={styles.eventList}>
          {[1, 2, 3].map((event) => (
            <TouchableOpacity key={event} style={styles.eventCard}>
              <Image
                source={{ uri: 'https://picsum.photos/200' }}
                style={styles.eventImage}
              />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>Summer Music Festival</Text>
                <Text style={styles.eventDate}>June 15, 2024</Text>
                <Text style={styles.eventStats}>1,200 tickets sold</Text>
              </View>
              <ChevronRight size={20} color={Theme.colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderCalendar = () => (
    <View style={styles.container}>
      <Text>Calendar View</Text>
    </View>
  );

  const renderTickets = () => (
    <View style={styles.container}>
      <Text>Tickets View</Text>
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.container}>
      <Text>Analytics View</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ArtistHeader title="Dashboard" />
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'calendar' && renderCalendar()}
      {activeTab === 'tickets' && renderTickets()}
      {activeTab === 'analytics' && renderAnalytics()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  container: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    marginHorizontal: Theme.spacing.xs,
    ...Platform.select({
      ios: {
        shadowColor: Theme.colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statValue: {
    fontSize: Theme.typography.fontSize.xxl,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  statLabel: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: '600',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    alignItems: 'center',
    marginHorizontal: Theme.spacing.xs,
    ...Platform.select({
      ios: {
        shadowColor: Theme.colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  actionText: {
    marginTop: Theme.spacing.sm,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.text,
  },
  eventList: {
    gap: Theme.spacing.md,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Theme.colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  eventInfo: {
    flex: 1,
    padding: Theme.spacing.md,
  },
  eventTitle: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: '600',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  eventDate: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  eventStats: {
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary,
  },
});

export default ArtistMobileApp;
